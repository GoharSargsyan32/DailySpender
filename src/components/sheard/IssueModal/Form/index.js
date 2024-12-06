import { Form, Input, Select, Space } from "antd";
import {
  ISSUE_OPTIONS,
  ISSUE_PRIORITY_OPTIONS,
} from "../../../../core/utils/issues";
import Editor from "../../Editor";


const ModalForm = ({ form, onFinish }) => {
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        name="IssueName"
        label="Issue Name"
        rules={[
          {
            required: true,
            message: "Please input Issue Name",
          },
        ]}
      >
        <Input
          type="trxt"
          placeholder="Issue Name"
          rules={[
            {
              required: true,
              message: "Please input Issue Type",
            },
          ]}
        />
      </Form.Item>

      <Form.Item name="type" label="Issue Type">
        <Select placeholder="Issue Type">
          {Object.values(ISSUE_OPTIONS).map(({ value, icon, label }) => {
            return (
              <Select.Option value={value} key={value}>
                <Space>
                  {icon}
                  <span>{label}</span>
                </Space>
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please input Issue Description",
          },
        ]}
      >
        <Editor />
      </Form.Item>

      <Form.Item
        name="priority"
        label="Priority"
        rules={[
          {
            required: true,
            message: "Please Select Priority",
          },
        ]}
      >
        <Select placeholder="Priority">
          {Object.values(ISSUE_PRIORITY_OPTIONS).map(
            ({ value, icon, label }) => {
              return (
                <Select.Option value={value} key={value}>
                  <Space>
                    {icon}
                    <span>{label}</span>
                  </Space>
                </Select.Option>
              );
            }
          )}
        </Select>
      </Form.Item>


    </Form>
  );
};

export default ModalForm;
