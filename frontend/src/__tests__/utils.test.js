import Logo from "assets/logoUnicam.png";
import getBase64 from "utils/getBase64";

test("should get base64 of an image", async () => {
  const file = new File(["logo"], Logo);

  const base64 = await getBase64(file);

  expect(typeof base64).toBe("string");
});
