/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";

inquirer
  .prompt([
    {
        type: "link",
        message: "Enter link to turn into QR code",
        name: "site"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers.site);
    var qr_svg = qr.image(answers.site);
    qr_svg.pipe(fs.createWriteStream('qr-output.png'));

    fs.writeFile("url.txt", answers.site, (err) => {
        if (err) throw err;
        console.log("File saved");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log("Something else went wrong")
    }
  });