import { useState,useEffect, useMemo } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip, MenuItem, Select, IconButton } from "@mui/material";
import AlertBox from "../components/AlertBox";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import zhCN from "date-fns/locale/zh-CN";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchBookings } from "../services/bookingService";
import { fetchRooms } from "../services/meetingRoomsService";

const locales = { "zh-CN": zhCN };
const localizer = dateFnsLocalizer({
  format: (date, formatStr) => format(date, formatStr, { locale: zhCN }),
  parse: (dateStr, formatStr) => parse(dateStr, formatStr, new Date(), { locale: zhCN }),
  startOfWeek: () => startOfWeek(new Date(), { locale: zhCN }),
  getDay,
  locales
});

const Bookings = () => {
  const [rooms, setRooms] = useState([]);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", start: new Date(), end: new Date(), room: "", description: "" });
  const [filterRoom, setFilterRoom] = useState("");
  const [error, setError] = useState(null);

  // 获取会议室数据
  const loadRooms = async () => {
    try {
      const data = await fetchRooms();
      setRooms(data);  // 设置获取到的数据
    } catch (error) {
      setError("Failed to load rooms:"+error);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  // 获取预约数据
  const loadBookings = async () => {
    try {
      const data = await fetchBookings();
      setEvents(data);  // 设置获取到的数据
    } catch (error) {
      setError("Failed to load rooms:"+error);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setEditMode(false);
    setNewEvent({ title: "", start, end, room: "", description: "" });
    setOpen(true);
  };

  const handleSelectEvent = (event) => {
    setEditMode(true);
    setSelectedEvent(event);
    setNewEvent(event);
    setOpen(true);
  };

  const handleSaveEvent = () => {
    if (editMode) {
      setEvents(events.map(evt => (evt === selectedEvent ? newEvent : evt)));
    } else {
      setEvents([...events, newEvent]);
    }
    setOpen(false);
  };

  const handleDeleteEvent = (eventToDelete) => {
    setEvents(events.filter(event => event !== eventToDelete));
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.room === "Room A" ? "#3f51b5" : "#ff9800"; // 按会议室区分颜色
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "5px",
        padding: "0px",
        // padding: "2px 5px",
      }
    };
  };

  const filteredEvents = filterRoom ? events.filter(event => event.room === filterRoom) : events;

  const {messages, formats  } = useMemo(
    () => ({
      messages: {
        date: '日期',
        time: '时间',
        event: '事件',
        allDay: '全天',
        week: '周视图',
        work_week: '工作周',
        day: '日视图',
        month: '月视图',
        previous: '前进',
        next: '后退',
        yesterday: '昨天',
        tomorrow: '明天',
        today: '今天',
        agenda: '日程列表',
        noEventsInRange: '这个时间范围内没有事件。',

        showMore: (total) => `+${total} 显示更多`,
      },
      formats: {
        monthHeaderFormat: (date, culture, localizer) =>
          localizer.format(date, `yyyy 年 MM 月`, culture),
        dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, 'yyyy年MM月dd日', culture) + ' - ' + localizer.format(end, 'yyyy年MM月dd日', culture),
        dayHeaderFormat: (date, culture, localizer) =>
          localizer.format(date, 'yyyy年MM月dd日 eeee', culture),
        agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, 'HH:mm', culture) +' - ' + localizer.format(end, 'HH:mm', culture),
        agendaHeaderFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, 'yyyy年MM月dd日', culture) + ' - ' + localizer.format(end, 'yyyy年MM月dd日', culture),
        agendaDateFormat: (date, culture, localizer) =>
          localizer.format(date, 'MM月dd日 eeee', culture),

      },
    }),
    []
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" size="medium" color="primary" onClick={() => { setEditMode(false); setOpen(true); }}>
          添加预约
        </Button>
        <Select size="small"
          value={filterRoom}
          onChange={(e) => setFilterRoom(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">全部会议室</MenuItem>
          {[...new Set(events.map(event => event.room))].map(room => (
            <MenuItem key={room} value={room}>{room}</MenuItem>
          ))}
        </Select>
      </Box>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        //eventLimit={3}
        //startAccessor="start"
        //endAccessor="end"
        messages={messages}
        formats={formats}
        resources={rooms}
        //resourceIdAccessor="id"
        //resourceTitleAccessor="name"
        selectable
        //showMultiDayTimes
        //dayLayoutAlgorithm="no-overlap"
        //allDayMaxRows={2}
        //popup
        style={{ height: 1100 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        components={{
          event: ({ event }) => (
            <Tooltip title={`${event.room}: ${event.description}`} arrow>
              <Box display="flex" alignItems="center">
                <span style={{ flexGrow: 1 }}>{event.title}</span>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleSelectEvent(event); }}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event); }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Tooltip>
          )
        }}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? "编辑会议室预约" : "新增会议室预约"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="会议标题" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
          <TextField fullWidth margin="dense" label="会议室" value={newEvent.room} onChange={(e) => setNewEvent({ ...newEvent, room: e.target.value })} />
          <TextField fullWidth margin="dense" label="描述" multiline rows={3} value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={handleSaveEvent} variant="contained" color="primary">{editMode ? "保存" : "添加"}</Button>
        </DialogActions>
      </Dialog>
      <AlertBox open={error !== null} onClose={() => setError(null)} message={error} severity="error" />
    </Box>
    
  );
};

export default Bookings;
