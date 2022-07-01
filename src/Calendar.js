import 'antd/dist/antd.css';
import './Calendar.css';
import { Form, DatePicker, TimePicker, Button, Input, Modal } from 'antd';
import moment from 'moment';
import NewEvent from './NewEventModal';
import { useState, useRef, useEffect } from 'react';
import { Badge } from 'antd';
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
  let prevDays = [];

  for (let i = 1; i <= prevDaysCount; i++) {
    prevDays.push(moment().startOf('month').subtract(i, 'day').date());
  }
  return prevDays.reverse();
}

const getNextMonthDays = () => {
  const nextDaysCount = 42 - prevDaysCount - moment().daysInMonth();
  return Array.from({length: nextDaysCount}, (_, i) => i + 1);
}

const Day = ({ date, renderer, clickHandler, className = '' }) => {
  const clickHandlerWrapper = () => clickHandler(date);

  return <div className={`day ${className}`} onClick={clickHandlerWrapper}>
    {date.date()}{renderer(date)}
  </div>;
}

const Days = ({ renderer, clickHandler }) => {
  const sharedProps = {clickHandler:clickHandler, renderer:renderer};
  const now = moment();

  return (
    <div className="days">
      {getPreviousMonthDays()
        .map(day => <Day date={moment([now.year(), now.clone().subtract(1, 'month').month(), day])} className='prev-date' {...sharedProps} />)}
      
      {Array.from({length: moment().daysInMonth()}, (_, i) => i + 1)
        .map(day => <Day date={moment([now.year(), now.month(), day])} {...sharedProps} />)}
      
      {getNextMonthDays()
        .map(day => <Day date={moment([now.year(), now.clone().add(1, 'month').month(), day])} className='next-date'  {...sharedProps} />)}
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