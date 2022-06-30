import 'antd/dist/antd.css';
import './Calendar.css';
import { Form, DatePicker, TimePicker, Button, Input, Modal } from 'antd';
import moment from 'moment';
import NewEvent from './NewEventModal';
import { useState, useRef, useEffect } from 'react';
import { Badge } from 'antd';
import { click } from '@testing-library/user-event/dist/click';
const { TextArea } = Input;
const events = [];

let selectedDate = {};

// Retrieves and maps data for every day in the selected month
const getListData = (value) => {

  const filteredEvents = events
    .filter(event => event.year == value.year()
      && event.month == value.month()
      && event.date == value.date());

  const listData = filteredEvents.map(event => {
    return {
      type: 'success', content: event.name
    }
  });

  return listData || [];
};

function useTraceUpdate(props) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}

const MonthSelector = () => {
  return (
    <div class="month">
      {moment().format("MMMM YYYY")}
    </div>
  );
}

const Weekdays = () => {

  const weekdays = moment.weekdays().map(weekday => <div>{weekday}</div>);
  return (
    <div class="weekdays">
      {weekdays}
    </div>
  )
}

let prevDaysCount;

const getPreviousMonthDays = () => {
  prevDaysCount = moment().startOf('month').subtract(1, 'day').day() + 1;
  console.log('month', moment().month())
  let prevDays = [];

  for (let i = 1; i <= prevDaysCount; i++) {
    prevDays.push(moment().startOf('month').subtract(i, 'day').date());
  }
  return prevDays.reverse();
}

const getNextMonthDays = () => {
  const totalDaysCount = 42;
  const nextDaysCount = totalDaysCount - prevDaysCount - moment().daysInMonth();

  let nextDays = [];
  for (let i = 1; i <= nextDaysCount; i++) {
    nextDays.push(moment().endOf('month').add(i, 'day').date());
  }
  return nextDays;
}

const Day = ({ date, renderer, clickHandler, className = '' }) => {
  const now = moment(`2022-5-${date}`);
  const clickHandlerWrapper = () => clickHandler(now);

  return <div className={className} onClick={clickHandlerWrapper}>
    {date}{renderer(now)}
  </div>;
}

const Days = ({ renderer, clickHandler }) => {
  const days = [];
  for (let i = 1; i <= moment().daysInMonth(); i++) {
    days.push(i);
  }
  return (
    <div className="days">
      {getPreviousMonthDays().map(day => <Day date={day} clickHandler={clickHandler} renderer={renderer} className='prev-date' />)}
      {days.map(day => <Day date={day} clickHandler={clickHandler} renderer={renderer} />)}
      {getNextMonthDays().map(day => <Day date={day} clickHandler={clickHandler} renderer={renderer} className='next-date' />)}
    </div>
  );
}

const Calendar = (props) => {
  useTraceUpdate(props);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values) => {
    setIsModalVisible(false);

    const event = {
      year: selectedDate.year(),
      month: selectedDate.month(),
      date: selectedDate.date(),
      name: values.name,
      startTime: values.startTime,
      endTime: values.endTime,
      description: values.description
    }

    events.push(event);
  };

  const handleCancel = (values) => {
    setIsModalVisible(false);
  };

  const handleDateSelection = (value) => {
    selectedDate = value;
    showModal();
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const dateCellRender = (value) => {
    console.log(value.toString());
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content} style={{ listStyle: 'none' }}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div className="calendar">
        <MonthSelector />
        <Weekdays />
        <Days renderer={dateCellRender} clickHandler={handleDateSelection} />
      </div>

      {showModal && <NewEvent
        selectedDate={selectedDate}
        handleCancel={handleCancel}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        showModal={showModal}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible} />}
    </>
  );
}

export default Calendar;