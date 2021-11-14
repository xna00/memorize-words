import _axios from "axios";
import { Vocabulary, Word } from "../../types/models";
const { host, token } = require("./config.js");
const axios = _axios.create({
  baseURL: host,
});
axios.interceptors.request.use((config) => {
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export async function getVocabularies() {
  return (await axios.get<Vocabulary[]>("/api/vocabularies")).data;
}

export async function getVocabulary(id: string, params: {}) {
  return (
    await axios.get<{
      total: number;
      data: Word[];
    }>("/api/vocabularies/" + id, {
      params,
    })
  ).data;
}
export async function createVocabulary(data: {
  name: string;
  words: string[];
}) {
  return (await axios.post("/api/vocabularies", data)).data;
}

export async function createLog(data: {
  word: string;
  type: "recognize" | "spell";
  grade: 0 | 1 | 2 | 3;
}) {
  return (await axios.post("/api/logs", data)).data;
}
