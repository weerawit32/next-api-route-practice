// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

const newId = () => {
  let id = 0;
  id++;
  return id;
};

const buildAccountPath = () => {
  return path.join(process.cwd(), "data", "users.json");
};

const getAccount = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const newAccount = {
      id: toString(newId),
      username: req.body.username,
      occupation: req.body.occupation,
    };

    const filePath = buildAccountPath();
    const fileData = getAccount(filePath);
    const data = JSON.parse(fileData);
    data.push(newAccount);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "success", account: newAccount });
  } else {
    const filePath = buildAccountPath();
    const data = getAccount(filePath);
    res.status(200).json({ accounts: data });
  }
}
