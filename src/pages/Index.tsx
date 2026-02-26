import { useState, useMemo } from "react";
import {
  User,
  Target,
  FileText,
  Ban,
  LayoutList,
  RotateCcw,
  ChevronDown,
  Sparkles,
  Brain
} from "lucide-react";

import { Header } from "@/components/Header";
import { PromptField } from "@/components/PromptField";
import { PromptPreview } from "@/components/PromptPreview";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import VoiceButton from "@/components/VoiceRecordButton";

// ========================
// OPCIONES DE LOS SELECTS
// ========================
const ROL_OPTIONS = ["Experto en", "Crítico/Revisor", "Tutor/Mentor", "Redactor Creativo"];
const TAREA_OPTIONS = ["Crear", "Redactar", "Analizar", "Resumir", "Traducir"];
const METODO_OPTIONS = [
  {
    label: "Paso a paso (Chain of Thought)",
    value: "Explica y piensa paso a paso antes de dar tu respuesta final"
  },
  {
    label: "3 soluciones (Tree of Thoughts)",
    value: "Imagina 3 soluciones diferentes y elige la mejor"
  }
];
const CONTEXTO_OPTIONS = ["para estudiantes", "para principiantes", "para una empresa pequeña"];
const RESTRICCIONES_OPTIONS = ["máximo 200 palabras", "lenguaje simple", "evitar tecnicismos"];
const FORMAT_OPTIONS = ["Resumen Ejecutivo", "Tabla Markdown", "HTML"];

const AI_OPTIONS = [
  { name: "ChatGPT", icon: "🤖", description: "Formato estructurado con Markdown" },
  { name: "Gemini", icon: "✨", description: "Estilo conversacional y natural" },
  { name: "Copilot", icon: "🚀", description: "Formato técnico con etiquetas" }
];

// ========================
// GENERADOR DE PROMPT
// ========================
interface PromptFields {
  rol: string;
  tarea: string;
  metodo: string;
  contexto: string;
  restricciones: string;
  formato: string;
}

const generatePrompt = (fields: PromptFields, ai: string): string => {
  const parts: string[] = [];

  if (ai === "ChatGPT") {
    if (fields.rol) parts.push(`Eres ${fields.rol}.`);
    if (fields.tarea) parts.push(`**Tarea:** ${fields.tarea}`);
    if (fields.metodo) parts.push(`**Método:** ${fields.metodo}`);
    if (fields.contexto) parts.push(`**Contexto:** ${fields.contexto}`);
    if (fields.restricciones) parts.push(`**Restricciones:** ${fields.restricciones}`);
    if (fields.formato) parts.push(`**Formato esperado:** ${fields.formato}`);
  }

  return parts.join("\n\n");
};

// ========================
// COMPONENTE PRINCIPAL
// ========================
export default function Index() {
  const [selectedAI, setSelectedAI] = useState(AI_OPTIONS[0]);

  const [fields, setFields] = useState<PromptFields>({
    rol: "",
    tarea: "",
    metodo: "",
    contexto: "",
    restricciones: "",
    formato: ""
  });

  // ********** Estado y funciones del botón de grabación **********
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    console.log("🎙️ Iniciando grabación...");
    setIsRecording(true);
  };

  const stopRecording = () => {
    console.log("🟥 Deteniendo grabación...");
    setIsRecording(false);
  };
  // ***************************************************************

  const updateField = (field: keyof PromptFields) => (value: string) =>
    setFields((prev) => ({ ...prev, [field]: value }));

  const resetFields = () =>
    setFields({
      rol: "",
      tarea: "",
      metodo: "",
      contexto: "",
      restricciones: "",
      formato: ""
    });

  const generatedPrompt = useMemo(
    () => generatePrompt(fields, selectedAI.name),
    [fields, selectedAI]
  );

  const isEmpty = !Object.values(fields).some((v) => v.trim());

  return (
    <div
      className="min-h-screen px-4 pb-20 sm:pb-24 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* Glow futurista */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-purple-500/10 to-transparent blur-3xl" />

      <Header />

      <main className="relative max-w-xl mx-auto space-y-6 z-10">
        {/* AI SELECTOR */}
        <div className="glass p-4 rounded-2xl text-center shadow-xl">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="text-primary animate-pulse" size={20} />
            <span className="text-lg font-semibold text-white/90">
              Optimizar para:
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="mt-3 glass-btn text-white gap-2 w-full justify-center"
              >
                <span>{selectedAI.icon}</span>
                <span>{selectedAI.name}</span>
                <ChevronDown size={16} className="opacity-80" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="glass p-2 w-52">
              {AI_OPTIONS.map((ai) => (
                <DropdownMenuItem
                  key={ai.name}
                  onClick={() => setSelectedAI(ai)}
                  className="cursor-pointer rounded-md hover:bg-white/20 transition"
                >
                  {ai.icon} {ai.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* FORM FIELDS */}
        <div className="glass rounded-2xl p-6 space-y-6 shadow-2xl">
          <PromptField
            label="Rol"
            placeholder="Ej: experto en marketing..."
            value={fields.rol}
            onChange={updateField("rol")}
            icon={<User />}
          />
          <PromptField
            label="Tarea"
            placeholder="Ej: crear un plan..."
            value={fields.tarea}
            onChange={updateField("tarea")}
            icon={<Target />}
          />
          <PromptField
            label="Método"
            placeholder="Selecciona técnica..."
            value={fields.metodo}
            onChange={updateField("metodo")}
            icon={<Brain />}
          />
          <PromptField
            label="Contexto"
            placeholder="Ej: para una tienda..."
            value={fields.contexto}
            onChange={updateField("contexto")}
            icon={<FileText />}
          />
          <PromptField
            label="Restricciones"
            placeholder="Ej: lenguaje simple..."
            value={fields.restricciones}
            onChange={updateField("restricciones")}
            icon={<Ban />}
          />
          <PromptField
            label="Formato"
            placeholder="Ej: tabla markdown..."
            value={fields.formato}
            onChange={updateField("formato")}
            icon={<LayoutList />}
          />

          {/* RESET */}
          <Button
            variant={isEmpty ? "outline" : "destructive"}
            disabled={isEmpty}
            onClick={resetFields}
            className="w-full mt-2 glass-btn text-white"
          >
            <RotateCcw size={16} className="mr-2" /> Limpiar todo
          </Button>
        </div>

        {/* PREVIEW */}
        <PromptPreview prompt={generatedPrompt} isEmpty={isEmpty} />

        {/* 🎤 BOTÓN DE GRABAR — AHORA UBICADO CORRECTAMENTE */}
        <div className="flex justify-center mt-4 mb-10">
          <VoiceButton
            isRecording={isRecording}
            onStart={startRecording}
            onStop={stopRecording}
          />
        </div>
      </main>

      {/* Estilos Glass */}
      <style>{`
        .glass {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.18);
        }
        .glass-btn {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.22);
        }
      `}</style>
    </div>
  );
}