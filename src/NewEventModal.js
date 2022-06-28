import 'antd/dist/antd.css';
import { Form, DatePicker, TimePicker, Button, Input, Modal } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

const NewEvent = (props) => {
  return (
    <>
      {props.isModalVisible &&
        <Modal
          title="New Event"
          visible={props.isModalVisible}
          footer=''
          width='650px'
          onOk={props.onFinish}
          onCancel={props.handleCancel}
        >

          <div style={{ marginTop: '40px' }}>

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
              onFinish={props.onFinish}
              onFinishFailed={props.onFinishFailed}
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
                <DatePicker
                  disabled='true'
                  style={{ width: '100%' }}
                  defaultValue={moment(props.selectedDate)}
                />
              </Form.Item>

              <Form.Item
                label="Start Time"
                name="startTime"
              >

                <TimePicker
                  format="HH:mm"
                  placeholder='Start time'
                  style={{ width: '100%' }}
                  // defaultValue={moment()}
                  inputReadOnly
                />

              </Form.Item>

              <Form.Item
                label="End Time"
                name="endTime"
              >
                <TimePicker
                  picker='time'
                  format="HH:mm"
                  placeholder='End time'
                  style={{ width: '100%' }}
                  // defaultValue={moment().add(1, 'hour')}
                  inputReadOnly
                />

              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
              >
                <TextArea allowClear rows={4} placeholder="A few words about the event (optional)" maxLength={6} />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <div
                  style={{ float: 'right' }}>
                  <Button onClick={props.handleCancel}>
                    Cancel
                  </Button>

                  <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>
                    Submit
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      }
    </>
  );
}

export default NewEvent;
