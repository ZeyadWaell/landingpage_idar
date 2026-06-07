import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = {
  width: 96,
  height: 96,
};

export const contentType = "image/png";

export default async function Icon() {
  const logoData = await readFile(path.join(process.cwd(), "public", "lgoo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        <img
          src={logoSrc}
          width={90}
          height={90}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    },
  );
}
