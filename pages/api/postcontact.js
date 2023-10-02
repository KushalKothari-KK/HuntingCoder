import * as fs from "fs";
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    let data = await fs.promises.readdir("contactdata");
    fs.writeFile(
      `contactdata/${data.length + 1}.json`,
      JSON.stringify(req.body),
      (err) => {
        if (err) {
          res.status(500).json({ error: "Internal Error" });
        }
      }
    );
    res.status(200).json(req.body);
  } else {
    // Handle any other HTTP method
    res.status(200).json(["allBlogs"]);
  }
}
