import { useState } from "react";
import { useEffect } from "react";
import { createLog, getVocabularies, getVocabulary } from "../service/api";
import type { Vocabulary, Word } from "../../../../types/models";
import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Switch,
  Table,
  TableColumnProps,
  TableColumnsType,
  TableColumnType,
  Tooltip,
} from "antd";
import { EyeInvisibleTwoTone, EyeTwoTone } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import moment, { Moment } from "moment";
import axios from "axios";

const Grades = {
  毫无印象: 0,
  模棱两可: 1,
  想起来了: 2,
  脱口而出: 3,
};

export default () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  useEffect(() => {
    getVocabularies().then((res) => {
      console.log(res);
      setVocabularies(res);
      res.length && setSelectedVocabulary(res[0]._id);
    });
  }, []);

  const [form] = useForm();
  const [selectedVocabulary, setSelectedVocabulary] = useState<string>();
  const [words, setWords] = useState<Word[]>([]);
  const [total, setTotal] = useState(0);
  const [params, setParams] = useState<{}>({});
  const [drawVisible, setDrawVisible] = useState(false);
  const [grades, setGrades] = useState<Record<string, number>>({});
  const [senseVisible, setSenseVisible] = useState<string[]>([]);
  const [detailWord, setDetailWord] = useState<Word>();

  useEffect(() => {
    if (selectedVocabulary) {
      console.log(params);
      const tmp = form.getFieldsValue();
      tmp.firstlyLearnTimeRange = tmp.firstlyLearnTimeRange?.map((m: any) =>
        m.toISOString()
      );
      tmp.lastlyLearnTimeRange = tmp.lastlyLearnTimeRange?.map((m: any) =>
        m.toISOString()
      );
      getVocabulary(selectedVocabulary, { ...params, ...tmp }).then((res) => {
        console.log(res);
        setTotal(res.total);
        setWords(res.data);
      });
    }
  }, [selectedVocabulary, params]);
  const columns: (Omit<TableColumnType<Word>, "dataIndex"> & {
    dataIndex?: keyof Word;
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
    // {
    //   title: "形式",
    //   dataIndex: "forms",
    //   render: (_, row) =>
    //     row.forms
    //       ? Object.entries(row.forms)
    //           .map((e) => e[0] + ":" + e[1])
    //           .join(",")
    //       : null,
    // },
    {
      title: (
        <div>
          senses
          {senseVisible.length === words.length ? (
            <EyeInvisibleTwoTone onClick={() => setSenseVisible([])} />
          ) : (
            <EyeTwoTone
              onClick={() => setSenseVisible(words.map((w) => w.word))}
            />
          )}
        </div>
      ),
      dataIndex: "senses",
      width: 300,
      render(senses = [], row) {
        const chinese = senses.map((s: any) => s.chineseExplanation).join("；");
        const tootip = senses
          .map((s: any) => s.englishExplanation + s.chineseExplanation)
          .join("\n");
        return senseVisible.includes(row.word) ? (
          <div className="flex items-center justify-between">
            <Tooltip title={<p className="whitespace-pre-wrap">{tootip}</p>}>
              <span className="line-clamp-1">{chinese}</span>
            </Tooltip>
            <EyeInvisibleTwoTone
              onClick={() =>
                setSenseVisible(senseVisible.filter((w) => w !== row.word))
              }
            />
          </div>
        ) : (
          <div onClick={() => setSenseVisible([...senseVisible, row.word])}>
            <EyeTwoTone />
          </div>
        );
      },
    },
    {
      title: "memory",
      dataIndex: "word",
      render(word, row, index) {
        return (
          <Radio.Group
            value={grades[word]}
            onChange={({ target }) => {
              setGrades({
                ...grades,
                [word]: target.value,
              });
              console.log(word, index);
            }}
          >
            {Object.entries(Grades).map(([d, v]) => {
              return (
                <Radio value={v} key={d}>
                  <Tooltip title={d}>{v}</Tooltip>
                </Radio>
              );
            })}
          </Radio.Group>
        );
      },
    },
    {
      title: "operation",
      dataIndex: "word",
      render(word: string, row) {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setDrawVisible(true);
                setDetailWord(row);
              }}
            >
              detail
            </Button>
            <Button
              type="link"
              onClick={() => {
                if (grades[word] === undefined) {
                  message.warn("plese select");
                } else
                  createLog([{ type: "recongize", word, grade: grades[word] }]);
              }}
            >
              submit
            </Button>
            <Button
              type="link"
              onClick={() => {
                axios
                  .delete(`/api/vocabularies/${selectedVocabulary}/${word}`)
                  .then((res) => {
                    console.log(res.data);
                    setParams({ ...params });
                  });
              }}
            >
              delete
            </Button>
          </>
        );
      },
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
      <Form
        form={form}
        layout="inline"
        onSubmitCapture={(...args) => {
          setParams({
            ...params,
          });
        }}
      >
        <Form.Item label="fist time" name="firstlyLearnTimeRange">
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item label="invert" name="invertFirstlyLearnTimeRange">
          <Switch size="small" />
        </Form.Item>
        <Form.Item
          label="last time"
          name="lastlyLearnTimeRange"
          normalize={(value: Moment[] | null) => {
            console.log(value);
            if (Array.isArray(value) && value.length === 2)
              return [value[0].startOf("day"), value[1].endOf("day")];
            else return value;
          }}
          initialValue={[
            moment().subtract(1, "day").startOf("day"),
            moment().endOf("day"),
          ]}
        >
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item label="invert" name="invertLastlyLearnTimeRange">
          <Switch size="small" />
        </Form.Item>
        <Form.Item label="recongize grade" name="recongizeAverageGrade[0]">
          <InputNumber />
        </Form.Item>
        <Form.Item name="recongizeAverageGrade[1]">
          <InputNumber />
        </Form.Item>
        <Form.Item label="invert" name="invertRecongizeAverageGrade">
          <Switch size="small" />
        </Form.Item>
        <Form.Item label="recongize count" name="recongizeCount[0]">
          <InputNumber />
        </Form.Item>
        <Form.Item name="recongizeCount[1]">
          <InputNumber />
        </Form.Item>
        <Form.Item label="invert" name="invertRecongizeCount">
          <Switch size="small" />
        </Form.Item>
        <Form.Item label="grade" name="averageGrade[0]">
          <InputNumber />
        </Form.Item>
        <Form.Item name="averageGrade[1]">
          <InputNumber />
        </Form.Item>
        <Form.Item label="invert" name="invertAverageGrade">
          <Switch size="small" />
        </Form.Item>
        <Form.Item label="learn count" name="learnCount[0]">
          <InputNumber />
        </Form.Item>
        <Form.Item name="learnCount[1]">
          <InputNumber />
        </Form.Item>
        <Form.Item label="invert" name="invertLearnCount">
          <Switch size="small" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          search
        </Button>
      </Form>
      <div className="text-right">
        <Button
          onClick={() => {
            createLog(
              words
                .filter((w) => grades[w.word] !== undefined)
                .map((w) => ({
                  word: w.word,
                  type: "recongize",
                  grade: grades[w.word],
                }))
            );
          }}
        >
          submit
        </Button>
      </div>

      <Table
        rowKey="word"
        columns={columns}
        dataSource={words}
        pagination={{ total, showTotal: (total) => total }}
        onChange={(pagination, filters, sorter, extra) => {
          if (extra.action === "paginate") {
            setParams({
              ...params,
              pageNum: pagination.current,
              pageSize: pagination.pageSize,
            });
          }
        }}
      />
      <Drawer visible={drawVisible} onClose={() => setDrawVisible(false)} width={700}>
        {JSON.stringify(detailWord)}
      </Drawer>
    </div>
  );
};
