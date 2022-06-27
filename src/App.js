import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Form, DatePicker, Checkbox, Button, Input } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Header, Footer, Sider, Content } = Layout;

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function App() {
  return (
    <>
      <Layout>
        <Content style={{ marginTop: '40px', width: '500px', alignSelf: 'center' }}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >

            <Form.Item
              label="Event Name"
              name="eventName"
              rules={[
                {
                  required: true,
                  message: 'Please input the event name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Event Date"
              name="eventDate"
              rules={[
                {
                  required: true,
                  message: 'Please input the date!',
                },
              ]}
            >
              <DatePicker inputReadOnly />
              
              <RangePicker
                picker='time'
                showTime={{
                  defaultValue: [moment(Date.now(), 'HH:mm'), moment(Date.now(), 'HH:mm')],
                }}
                format="HH:mm"
              />

            </Form.Item>



            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}

export default App;
