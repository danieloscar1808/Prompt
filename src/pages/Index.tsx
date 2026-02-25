import { useState, useMemo } from "react";
import { User, Target, FileText, Ban, LayoutList, RotateCcw, ChevronDown, Sparkles, Brain } from "lucide-react";
import { Header } from "@/components/Header";
import { PromptField } from "@/components/PromptField";
import { PromptPreview } from "@/components/PromptPreview";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const ROL_OPTIONS = ["Experto en", "Crítico/Revisor", "Tutor/Mentor", "Redactor Creativo", "Analista de Datos", "Traductor/Localizador", "Programador Senior", "Consultor Estratégico", "Entrevistador/Reclutador", "Editor de Estilo"];
const TAREA_OPTIONS = ["Crear", "Redactar", "Analizar", "Resumir", "Traducir", "Explicar", "Comparar", "Generar ideas", "Corregir", "Optimizar", "Investigar"];
const METODO_OPTIONS = [
  { label: "Paso a paso (Chain of Thought)", value: "Explica y piensa paso a paso antes de dar tu respuesta final" },
  { label: "3 soluciones (Tree of Thoughts)", value: "Imagina 3 soluciones diferentes, evalúa los pros y contras de cada una y selecciona la más eficiente" },
  { label: "Planifica y ejecuta (Plan And Solve)", value: "Primero planifica tu enfoque detalladamente y luego ejecuta el plan paso a paso" },
  { label: "Reflexiona antes (Thinking)", value: "Reflexiona un tiempo sobre las posibles fallas en tu lógica antes de responder" }
];
const CONTEXTO_OPTIONS = ["para una empresa pequeña", "para estudiantes", "para redes sociales", "para un blog", "para una presentación", "para un informe académico", "para un público técnico", "para principiantes", "en español latinoamericano", "con tono profesional"];
const RESTRICCIONES_OPTIONS = ["evitar jerga técnica", "máximo 200 palabras", "sin listas", "solo respuestas cortas", "no usar ejemplos", "sin repeticiones", "evitar superlativos", "sin citas textuales", "lenguaje simple", "sin emojis"];
const FORMAT_OPTIONS = ["Resumen Ejecutivo", "Informe Estructurado", "Informe Técnico", "Análisis Comparativo", "Preguntas y Respuestas", "Guion de Presentación", "Tablas Markdown", "Listas Jerárquicas", "Diagrama de Flujo", "Análisis FODA", "Markdown (.md)", "JSON / XML", "CSV", "Código LaTeX", "HTML"];
const AI_OPTIONS = [{
  name: "ChatGPT",
  icon: "🤖",
  description: "Formato estructurado con Markdown y etiquetas en negrita"
}, {
  name: "Gemini",
  icon: "✨",
  description: "Estilo conversacional y natural"
}, {
  name: "Copilot",
  icon: "🚀",
  description: "Formato técnico con etiquetas entre corchetes [TAG]"
}];
interface PromptFields {
  rol: string;
  tarea: string;
  metodo: string;
  contexto: string;
  restricciones: string;
  formato: string;
}
const generatePrompt = (fields: PromptFields, aiName: string): string => {
  const parts: string[] = [];

  // Formato específico según la IA
  if (aiName === "ChatGPT") {
    // ChatGPT responde bien a instrucciones directas y estructuradas
    if (fields.rol.trim()) {
      parts.push(`Eres ${fields.rol.trim()}.`);
    }
    if (fields.tarea.trim()) {
      parts.push(`**Tarea:** ${fields.tarea.trim()}`);
    }
    if (fields.metodo.trim()) {
      parts.push(`**Método:** ${fields.metodo.trim()}`);
    }
    if (fields.contexto.trim()) {
      parts.push(`**Contexto:** ${fields.contexto.trim()}`);
    }
    if (fields.restricciones.trim()) {
      parts.push(`**Restricciones:** ${fields.restricciones.trim()}`);
    }
    if (fields.formato.trim()) {
      parts.push(`**Formato esperado:** ${fields.formato.trim()}`);
    }
  } else if (aiName === "Gemini") {
    // Gemini prefiere prompts más conversacionales con contexto claro
    if (fields.rol.trim()) {
      parts.push(`Quiero que actúes como ${fields.rol.trim()}.`);
    }
    if (fields.contexto.trim()) {
      parts.push(`Para darte contexto: ${fields.contexto.trim()}`);
    }
    if (fields.tarea.trim()) {
      parts.push(`Necesito que ${fields.tarea.trim()}.`);
    }
    if (fields.metodo.trim()) {
      parts.push(`${fields.metodo.trim()}`);
    }
    if (fields.restricciones.trim()) {
      parts.push(`Ten en cuenta estas restricciones: ${fields.restricciones.trim()}`);
    }
    if (fields.formato.trim()) {
      parts.push(`Por favor, presenta la respuesta en: ${fields.formato.trim()}`);
    }
  } else if (aiName === "Copilot") {
    // Copilot funciona bien con instrucciones concisas y técnicas
    if (fields.rol.trim()) {
      parts.push(`[ROL] ${fields.rol.trim()}`);
    }
    if (fields.tarea.trim()) {
      parts.push(`[OBJETIVO] ${fields.tarea.trim()}`);
    }
    if (fields.metodo.trim()) {
      parts.push(`[MÉTODO] ${fields.metodo.trim()}`);
    }
    if (fields.contexto.trim()) {
      parts.push(`[CONTEXTO] ${fields.contexto.trim()}`);
    }
    if (fields.restricciones.trim()) {
      parts.push(`[RESTRICCIONES] ${fields.restricciones.trim()}`);
    }
    if (fields.formato.trim()) {
      parts.push(`[OUTPUT] ${fields.formato.trim()}`);
    }
  }
  return parts.join("\n\n");
};
const Index = () => {
  const [selectedAI, setSelectedAI] = useState(AI_OPTIONS[0]);
  const [fields, setFields] = useState<PromptFields>({
    rol: "",
    tarea: "",
    metodo: "",
    contexto: "",
    restricciones: "",
    formato: ""
  });
  const updateField = (field: keyof PromptFields) => (value: string) => {
    setFields(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const resetFields = () => {
    setFields({
      rol: "",
      tarea: "",
      metodo: "",
      contexto: "",
      restricciones: "",
      formato: ""
    });
  };
  const generatedPrompt = useMemo(() => generatePrompt(fields, selectedAI.name), [fields, selectedAI]);
  const isEmpty = !Object.values(fields).some(v => v.trim());
  return <div className="min-h-screen pb-6 sm:pb-8 bg-cover bg-center bg-fixed bg-no-repeat" style={{ backgroundImage: "url('/images/background.png')" }}>
      <Header />

      <main className="px-3 sm:px-4 max-w-lg mx-auto space-y-3 sm:space-y-4 animate-fade-in">
        {/* AI Selector */}
        <div className="flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]">
          <Sparkles size={16} className="text-primary rounded-none shadow-none animate-pulse" />
          <span className="text-base text-destructive-foreground font-serif">Optimizar para:</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 bg-card border-border transition-all duration-200 hover:shadow-md active:scale-95">
                      <span>{selectedAI.icon}</span>
                      <span>{selectedAI.name}</span>
                      <ChevronDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="bg-card border-border animate-scale-in">
                    {AI_OPTIONS.map(ai => <DropdownMenuItem key={ai.name} onClick={() => setSelectedAI(ai)} className="cursor-pointer gap-2 flex-col items-start transition-colors duration-150 hover:bg-accent">
                        <div className="flex items-center gap-2">
                          <span>{ai.icon}</span>
                          <span className="font-medium">{ai.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{ai.description}</span>
                      </DropdownMenuItem>)}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs text-center">
                <p className="font-medium mb-1">Formato según IA:</p>
                <p className="text-xs text-muted-foreground">{selectedAI.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Prompt Fields */}
        <PromptField label="Rol" placeholder="Ej: un experto en marketing digital..." description="¿Qué papel debe asumir la IA?" value={fields.rol} onChange={updateField("rol")} icon={<User size={18} />} descriptionAction={<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-6 w-6 transition-all duration-200 hover:scale-110 active:scale-95">
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="max-h-64 overflow-y-auto bg-card border-border animate-scale-in">
                {ROL_OPTIONS.map(rol => <DropdownMenuItem key={rol} onClick={() => updateField("rol")(fields.rol ? `${fields.rol}, ${rol}` : rol)} className="cursor-pointer transition-colors duration-150">
                    {rol}
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>} />

        <PromptField label="Tarea" placeholder="Ej: crear un plan de contenido mensual..." description="¿Qué quieres que haga la IA?" value={fields.tarea} onChange={updateField("tarea")} icon={<Target size={18} />} descriptionAction={<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-6 w-6 transition-all duration-200 hover:scale-110 active:scale-95">
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="max-h-64 overflow-y-auto bg-card border-border animate-scale-in">
                {TAREA_OPTIONS.map(tarea => <DropdownMenuItem key={tarea} onClick={() => updateField("tarea")(fields.tarea ? `${fields.tarea}, ${tarea}` : tarea)} className="cursor-pointer transition-colors duration-150">
                    {tarea}
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>} />

        <PromptField label="Método de Instrucción" placeholder="Selecciona una técnica de prompting..." description="¿Cómo debe razonar la IA?" value={fields.metodo} onChange={updateField("metodo")} icon={<Brain size={18} />} descriptionAction={<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-6 w-6 transition-all duration-200 hover:scale-110 active:scale-95">
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="max-h-64 overflow-y-auto bg-card border-border animate-scale-in w-72">
                {METODO_OPTIONS.map(metodo => <DropdownMenuItem key={metodo.label} onClick={() => updateField("metodo")(metodo.value)} className="cursor-pointer transition-colors duration-150 flex-col items-start">
                    <span className="font-medium">{metodo.label}</span>
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>} />

        <PromptField label="Contexto" placeholder="Ej: para una tienda de ropa juvenil..." description="Información adicional relevante" value={fields.contexto} onChange={updateField("contexto")} icon={<FileText size={18} />} descriptionAction={<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-6 w-6 transition-all duration-200 hover:scale-110 active:scale-95">
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="max-h-64 overflow-y-auto bg-card border-border animate-scale-in">
                {CONTEXTO_OPTIONS.map(contexto => <DropdownMenuItem key={contexto} onClick={() => updateField("contexto")(fields.contexto ? `${fields.contexto}, ${contexto}` : contexto)} className="cursor-pointer transition-colors duration-150">
                    {contexto}
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>} />

        <PromptField label="Restricciones" placeholder="Ej: no uses jerga técnica, evita listas largas..." description="¿Qué debe evitar la IA?" value={fields.restricciones} onChange={updateField("restricciones")} icon={<Ban size={18} />} descriptionAction={<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-6 w-6 transition-all duration-200 hover:scale-110 active:scale-95">
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="max-h-64 overflow-y-auto bg-card border-border animate-scale-in">
                {RESTRICCIONES_OPTIONS.map(restriccion => <DropdownMenuItem key={restriccion} onClick={() => updateField("restricciones")(fields.restricciones ? `${fields.restricciones}, ${restriccion}` : restriccion)} className="cursor-pointer transition-colors duration-150">
                    {restriccion}
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>} />

        <PromptField label="Formato" placeholder="Ej: lista con viñetas, máximo 5 puntos..." description="¿Cómo quieres la respuesta?" value={fields.formato} onChange={updateField("formato")} icon={<LayoutList size={18} />} descriptionAction={<DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-6 w-6 transition-all duration-200 hover:scale-110 active:scale-95">
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="max-h-64 overflow-y-auto bg-card border-border animate-scale-in">
                {FORMAT_OPTIONS.map(format => <DropdownMenuItem key={format} onClick={() => updateField("formato")(fields.formato ? `${fields.formato}, ${format}` : format)} className="cursor-pointer transition-colors duration-150">
                    {format}
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>} />

        {/* Reset Button */}
        <Button variant={isEmpty ? "outline" : "destructive"} onClick={resetFields} disabled={isEmpty} className={`w-full gap-2 transition-all duration-200 hover:shadow-lg active:scale-[0.98] backdrop-blur-md border-white/20 ${isEmpty ? "bg-card/10 text-muted-foreground hover:bg-card/20 dark:text-foreground" : "text-white dark:text-foreground"}`}>
          <RotateCcw size={16} className={isEmpty ? "" : "transition-transform duration-300 hover:rotate-180"} />
          Limpiar todo
        </Button>

        {/* Preview */}
        <PromptPreview prompt={generatedPrompt} isEmpty={isEmpty} />
      </main>
    </div>;
};
export default Index;