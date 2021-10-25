import { useState } from "react";
import { useEffect } from "react";
import { getVocabularies, getVocabulary } from "../service/api";
import type { Vocabulary, Word } from "../../../types/models";
import {
  Form,
  Select,
  Table,
  TableColumnProps,
  TableColumnsType,
  TableColumnType,
} from "antd";
import { useForm } from "antd/lib/form/Form";

export default () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  useEffect(() => {
    getVocabularies().then((res) => {
      console.log(res);
      setVocabularies(res);
    });
  }, []);

  const [form] = useForm();
  const [selectedVocabulary, setSelectedVocabulary] = useState<string>();
  const [words, setWords] = useState<Word[]>([]);
  useEffect(() => {
    if (selectedVocabulary) {
      getVocabulary(selectedVocabulary, {}).then((res) => {
        console.log(res);
        setWords(res.data);
      });
    }
  }, [selectedVocabulary]);
  const columns: (Omit<TableColumnType<Word>, "dataIndex"> & {
    dataIndex: keyof Word;
  })[] = [
    { title: "单词", dataIndex: "word" },
    {
      title: "发音",
      dataIndex: "phoneticSymbols",
      render: (_, row) => (
        <div>
          <a
            onClick={() => {
              new Audio(
                `http://ssl.gstatic.com/dictionary/static/sounds/oxford/${row.word}--_gb_1.mp3`
              ).play();
            }}
          >
            英{row.phoneticSymbols.uk}
          </a>
          ,
          <a
            onClick={() => {
              new Audio(
                `http://ssl.gstatic.com/dictionary/static/sounds/oxford/${row.word}--_us_1.mp3`
              ).play();
            }}
          >
            美{row.phoneticSymbols.us}
          </a>
        </div>
      ),
    },
    {
      title: "形式",
      dataIndex: "forms",
      render: (_, row) =>
        row.forms
          ? Object.entries(row.forms)
              .map((e) => e[0] + ":" + e[1])
              .join(",")
          : null,
    },
  ];
  return (
    <div className="p-4">
      <Select
        value={selectedVocabulary}
        options={vocabularies.map((v) => ({ label: v.name, value: v._id }))}
        onSelect={(value) => {
          setSelectedVocabulary(value);
        }}
      />
      <Form form={form}></Form>
      <Table rowKey="word" columns={columns} dataSource={words} />
    </div>
  );
};
