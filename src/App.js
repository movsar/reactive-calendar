import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Form, DatePicker, Button, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
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
              name="name"
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
              label="Date"
              name="date"

            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Start Time"
              name="startTime"
              rules={[
                {
                  required: true,
                  message: 'Please select the start time!',
                },
              ]}
            >

              <DatePicker
                picker='time'
                format="HH:mm"
                placeholder='Start time'
                style={{ width: '50%' }}
                defaultValue={moment()}
              />

            </Form.Item>

            <Form.Item
              label="End Time"
              name="endTime"
              rules={[
                {
                  required: true,
                  message: 'Please select the start time!',
                },
              ]}
            >
              <DatePicker
                picker='time'
                format="HH:mm"
                placeholder='End time'
                style={{ width: '50%' }}
                defaultValue={moment().add(1, 'hour')}
              />

            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <TextArea rows={4} placeholder="A few words about the event (optional)" maxLength={6} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <div
                style={{ float: 'right' }}>
                <Button>
                  Cancel
                </Button>

                <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}

export default App;
