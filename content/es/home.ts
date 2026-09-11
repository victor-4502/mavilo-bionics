import type { HomeContent } from "../types";

const es: HomeContent = {
  meta: {
    title: "Mavilo Bionics — Ingeniería biónica",
    description:
      "Mavilo Bionics desarrolla Mav 1, una mano biónica de precisión. Ingeniería mexicana aplicada a la movilidad humana.",
  },
  nav: {
    product: "Producto",
    technology: "Tecnología",
    application: "Aplicación",
    contact: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    home: "Inicio",
  },
  hero: {
    eyebrow: "Mav 1",
    title: "Movimiento con precisión.",
    subtitle:
      "Ingeniería biónica mexicana. Una mano diseñada para sentir como producto, no como plantilla clínica.",
    ctaPrimary: "Conocer Mav 1",
    ctaSecondary: "Hablar con nosotros",
  },
  mavilo: {
    eyebrow: "MAVILO",
    title: "Ingeniería mexicana aplicada a la movilidad humana.",
    body: "Diseñamos y construimos sistemas biónicos con rigor mecánico, control mioeléctrico y una experiencia de uso clara. El centro es el producto: precisión tangible, no promesas abstractas.",
  },
  hand: {
    eyebrow: "La mano",
    title: "Arquitectura pensada para el gesto.",
    body: "Silueta, escala y mecanismos alineados en un solo ensamble. Polímeros técnicos, geometría precisa y una construcción pensada para el movimiento coordinado de apertura y cierre.",
    specs: [
      { label: "Material", value: "Polímero técnico · carbon fiber" },
      { label: "Gesto", value: "Apertura / cierre coordinado" },
      { label: "Detalle", value: "Pads texturizados · pivotes mecánicos" },
    ],
  },
  signal: {
    eyebrow: "Sistema",
    title: "De la señal al movimiento.",
    steps: [
      {
        label: "Señal",
        body: "La actividad muscular se captura y filtra para orientar el control.",
      },
      {
        label: "Procesamiento",
        body: "El sistema interpreta el umbral calibrado del usuario.",
      },
      {
        label: "Control",
        body: "La lógica de la prótesis decide cuándo abrir o cerrar.",
      },
      {
        label: "Movimiento",
        body: "Los dedos responden en un gesto coordinado y predecible.",
      },
    ],
  },
  explore: {
    eyebrow: "Explora",
    title: "Arquitectura física.",
    body: "Recorre la carcasa, los dedos, el mecanismo, el pulgar y la base. Solo componentes reales del ensamble.",
    hotspots: {
      palm: {
        title: "Estructura",
        body: "Carcasa y tapa que definen el volumen protector de la mano.",
      },
      finger: {
        title: "Dedos",
        body: "Cuatro dedos con mecanismo común para un cierre coordinado.",
      },
      linkage: {
        title: "Mecanismo",
        body: "Eslabones del dedo que transmiten el gesto de flexión.",
      },
      thumb: {
        title: "Pulgar",
        body: "Subconjunto del pulgar integrado al gesto de apertura y cierre.",
      },
      fingerBase: {
        title: "Base",
        body: "Interfaz entre cada dedo y la estructura de la palma.",
      },
    },
  },
  movement: {
    eyebrow: "Movimiento",
    title: "Apertura y cierre.",
    body: "El gesto de producto es coordinado: los cuatro dedos se abren y se cierran juntos. Sin patrones de agarre inventados.",
    open: "Abrir",
    close: "Cerrar",
    scaffoldNote: "Scaffold — los controles se activarán con el modelo 3D.",
    scrollCue: "Scroll — la imagen cambia de abierta a perfil.",
  },
  engineering: {
    eyebrow: "Ingeniería",
    title: "Por dentro, por grupos.",
    body: "Una lectura técnica de la arquitectura: palma y tapa, cada dedo, pulgar y mecanismos — sin desmontar lo que no existe en el modelo.",
  },
  ecosystem: {
    eyebrow: "Ecosistema",
    title: "Calibración, app y acompañamiento.",
    body: "Mav 1 se integra con una aplicación móvil para calibrar el umbral mioeléctrico con seguridad y claridad, pensada para el uso diario y el flujo en clínica.",
    points: [
      "Señal muscular en vivo durante la calibración",
      "Modo de calibración que mantiene la mano bloqueada",
      "Umbral que permanece en la prótesis",
      "Cuentas y dispositivos pensados para equipos clínicos",
    ],
  },
  contact: {
    eyebrow: "Contacto",
    title: "Construyamos el siguiente movimiento.",
    body: "Si eres usuario, clínica o colaborador, escríbenos. Queremos conversaciones precisas sobre Mav 1 y lo que viene.",
    email: "contacto@mavilobionics.com",
    cta: "Enviar correo",
    audiences: ["Usuarios", "Clínicas", "Colaboradores", "Consulta general"],
  },
  footer: {
    tagline: "Biónica con propósito humano.",
    privacy: "Política de privacidad",
    rights: "Todos los derechos reservados.",
  },
  three: {
    placeholderLabel: "Mav 1",
    placeholderHint: "Escena lista para hand-hero.glb",
    productAlt: "Mano biónica Mavilo Mav 1",
    productHint: "Fotografía de producto · el modelo 3D se integrará aquí",
  },
};

export default es;
