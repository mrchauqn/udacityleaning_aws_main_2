import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util.js";
import fs from "fs";
import path from 'path';

// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

/**************************************************************************** */

//! END @TODO1

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("try GET /filteredimage?image_url={{}}");
});

app.get("/filteredimage", async (req, res) => {
  const imgUrl = req.query.image_url;

  //    1. validate the image_url query
  if (!imgUrl || imgUrl.match(/\.(jpeg|jpg|gif|png)$/) == null) {
    res.status(422).send("Please input a valid image url");
    return;
  }

  // const cat_origin_url =
  //   "https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg";

  // const cat_url_1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/181px-Cat_August_2010-4.jpg"

  //    2. call filterImageFromURL(image_url) to filter the image
  const imgPath = await filterImageFromURL(imgUrl);
  const absolutePath = path.resolve(imgPath);

  //    3. send the resulting file in the response
  res.status(200).sendFile(absolutePath);

  //    4. deletes any files on the server on finish of the response
  setTimeout(()=>{
    deleteLocalFiles([absolutePath]);
  }, 3000);
  return;
});

// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
