import { useState, useEffect, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, X, Save, FileJson, Image as ImageIcon, Loader2, CheckCircle2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuthRequired } from "@/hooks/useAuthRequired";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, Category } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ImagePreview {
  file: File;
  url: string;
  id: string;
}

const AddProductPage = () => {
  useAuthRequired();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isFree, setIsFree] = useState(false);
  
  // File states
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  
  // UI states
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Refs for file inputs
  const imageInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  // Load categories from Supabase
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (!error && data) {
      setCategories(data);
    }
  };

  // Check if vendedor
  useEffect(() => {
    if (profile && profile.user_type !== 'seller') {
      toast({
        title: "Acesso Negado",
        description: "Apenas vendedores podem acessar esta página",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [profile, navigate, toast]);

  // Image upload handlers
  const handleImageDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    addImages(files);
  };

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      addImages(files);
    }
  };

  const addImages = (files: File[]) => {
    const newImages: ImagePreview[] = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.url);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const moveImage = (id: string, direction: 'left' | 'right') => {
    setImages(prev => {
      const index = prev.findIndex(img => img.id === id);
      if (index === -1) return prev;
      
      const newIndex = direction === 'left' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newImages = [...prev];
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      return newImages;
    });
  };

  // JSON file handlers
  const handleJsonSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.json')) {
        setJsonFile(file);
      } else {
        toast({
          title: "Arquivo Inválido",
          description: "Por favor, selecione apenas arquivos .json",
          variant: "destructive",
        });
      }
    }
  };

  const handleJsonDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.json')) {
      setJsonFile(file);
    } else {
      toast({
        title: "Arquivo Inválido",
        description: "Por favor, solte apenas arquivos .json",
        variant: "destructive",
      });
    }
  };

  // Validation
  const isFormValid = () => {
    return name.trim() !== "" && 
           description.trim() !== "" && 
           categoryId !== "" &&
           (isFree || (price !== "" && parseFloat(price) > 0)) &&
           jsonFile !== null;
  };

  // Upload to Supabase Storage
  const uploadFile = async (file: File, bucket: string, path: string): Promise<string | null> => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!user || !isFormValid()) return;

    setLoading(true);
    setUploading(true);

    try {
      // Upload images
      const imageUrls: string[] = [];
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imagePath = `agents/${user.id}/${Date.now()}_${i}_${image.file.name}`;
        const url = await uploadFile(image.file, 'agent-images', imagePath);
        if (url) imageUrls.push(url);
      }

      // Upload JSON file
      let jsonUrl = null;
      if (jsonFile) {
        const jsonPath = `agents/${user.id}/${Date.now()}_${jsonFile.name}`;
        jsonUrl = await uploadFile(jsonFile, 'agent-files', jsonPath);
      }

      // Insert agent into database
      const { data, error } = await supabase
        .from('agents')
        .insert({
          seller_id: user.id,
          name: name.trim(),
          description: description.trim(),
          category_id: categoryId || null,
          price: isFree ? 0 : parseFloat(price),
          is_free: isFree,
          is_featured: false,
          n8n_url: jsonUrl,
          images: imageUrls,
          videos: videoUrl ? [videoUrl] : [],
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Agente Publicado!",
        description: "Seu agente foi cadastrado com sucesso",
      });

      // Cleanup
      images.forEach(img => URL.revokeObjectURL(img.url));
      
      // Redirect to profile
      navigate("/profile");

    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Erro ao Publicar",
        description: error.message || "Ocorreu um erro ao publicar o agente",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Cadastrar Novo Agente</h1>
            <p className="text-muted-foreground">
              Preencha as informações abaixo para adicionar seu agente à plataforma
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações do Agente</CardTitle>
              <CardDescription>
                Todos os campos marcados com * são obrigatórios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Nome do Agente */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Agente *</Label>
                <Input 
                  id="name" 
                  placeholder="Ex: SDR para Clínica Estética"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  required
                />
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description">Descrição Detalhada *</Label>
                <Textarea 
                  id="description"
                  placeholder="Descreva detalhadamente como o agente funciona, seus benefícios e casos de uso..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[150px]"
                  required
                />
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Preço */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isFree"
                    checked={isFree}
                    onChange={(e) => setIsFree(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="isFree" className="cursor-pointer">
                    Este agente é gratuito
                  </Label>
                </div>
                
                {!isFree && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$) *</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      step="0.01"
                      min="0"
                      placeholder="99.90"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required={!isFree}
                    />
                  </div>
                )}
              </div>

              {/* Upload de Imagens */}
              <div className="space-y-4">
                <Label>Imagens de Demonstração</Label>
                <div 
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors"
                  onDrop={handleImageDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => imageInputRef.current?.click()}
                >
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Adicione imagens do agente</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Arraste e solte ou clique para selecionar
                  </p>
                  <Button type="button" variant="outline" onClick={(e) => e.stopPropagation()}>
                    Selecionar Imagens
                  </Button>
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  multiple
                  className="hidden"
                  onChange={handleImageSelect}
                />
                
                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {images.map((image, index) => (
                      <div key={image.id} className="relative group">
                        <img 
                          src={image.url} 
                          alt={`Preview ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          {index > 0 && (
                            <Button
                              type="button"
                              size="icon"
                              variant="secondary"
                              onClick={() => moveImage(image.id, 'left')}
                            >
                              ←
                            </Button>
                          )}
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => removeImage(image.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          {index < images.length - 1 && (
                            <Button
                              type="button"
                              size="icon"
                              variant="secondary"
                              onClick={() => moveImage(image.id, 'right')}
                            >
                              →
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Formatos aceitos: JPEG, PNG. Máximo 5MB por imagem
                </p>
              </div>

              {/* Vídeo Demonstrativo */}
              <div className="space-y-2">
                <Label htmlFor="videoUrl">
                  <Video className="inline h-4 w-4 mr-2" />
                  Link do Vídeo (YouTube, Vimeo)
                </Label>
                <Input 
                  id="videoUrl"
                  type="url"
                  placeholder="https://youtube.com/..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Adicione um link para um vídeo demonstrativo do seu agente
                </p>
              </div>

              {/* Upload do Arquivo JSON */}
              <div className="space-y-4">
                <Label>Arquivo do Fluxo de Trabalho (.json) *</Label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    jsonFile 
                      ? 'border-accent bg-accent/10' 
                      : 'border-muted-foreground/25 hover:border-accent'
                  }`}
                  onDrop={handleJsonDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => jsonInputRef.current?.click()}
                >
                  {jsonFile ? (
                    <div className="flex items-center justify-center gap-4">
                      <CheckCircle2 className="h-8 w-8 text-accent" />
                      <div className="text-left">
                        <p className="font-medium">{jsonFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(jsonFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setJsonFile(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <FileJson className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium mb-2">Envie o arquivo do agente</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Arraste e solte ou clique para selecionar o arquivo .json
                      </p>
                      <Button type="button" variant="outline" onClick={(e) => e.stopPropagation()}>
                        Selecionar Arquivo .json
                      </Button>
                    </>
                  )}
                </div>
                <input
                  ref={jsonInputRef}
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleJsonSelect}
                />
                <p className="text-xs text-muted-foreground">
                  Este arquivo será o ativo digital entregue ao comprador
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button 
              variant="outline"
              onClick={() => navigate("/profile")}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid() || loading}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {uploading ? "Enviando arquivos..." : "Salvando..."}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Publicar Agente
                </>
              )}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddProductPage;
