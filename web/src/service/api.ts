import axios from "axios";
import { Vocabulary, Word } from "../../../types/models";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
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
