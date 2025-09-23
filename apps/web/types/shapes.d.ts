
export{}
declare global {
  interface Window {
    selectedShape: "circle" | "rectangle" | "eraser" | "pencil";
  }
}

export type Rectangle = {
  type: "rect";
  x: number;
  y: number;
  height: number;
  width: number;
  id?: number;
};

export type Circle = {
  type: "circle";
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  id?: number;
};

export type Path = {
  type: "path";
  points: { x: number; y: number }[];
  id?: number;
};

export type Shapes = Rectangle | Circle | Path;
