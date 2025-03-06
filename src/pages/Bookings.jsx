import { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip, MenuItem, Select, IconButton } from "@mui/material";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import zhCN from "date-fns/locale/zh-CN";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const locales = { "zh-CN": zhCN };
const localizer = dateFnsLocalizer({
  format: (date, formatStr) => format(date, formatStr, { locale: zhCN }),
  parse: (dateStr, formatStr) => parse(dateStr, formatStr, new Date(), { locale: zhCN }),
  startOfWeek: () => startOfWeek(new Date(), { locale: zhCN }),
  getDay,
  locales
});

const Bookings = () => {
  const [events, setEvents] = useState([
    {
      title: "Project Kickoff",
      start: new Date(2025, 2, 10, 10, 0),
      end: new Date(2025, 2, 10, 11, 0),
      room: "Room A",
      description: "Discuss project scope and deliverables."
    },
    {
      title: "Project Research",
      start: new Date(2025, 2, 10, 12, 0),
      end: new Date(2025, 2, 10, 13, 0),
      room: "Room A",
      description: "Discuss project scope and deliverables."
    },
    {
      title: "需求讨论会",
      start: new Date(2025, 2, 10, 10, 0),
      end: new Date(2025, 2, 10, 11, 0),
      room: "Room A",
      description: "Discuss project scope and deliverables."
    },
    {
      title: "Project Research2",
      start: new Date(2025, 2, 10, 13, 0),
      end: new Date(2025, 2, 10, 14, 0),
      room: "Room A",
      description: "Discuss project scope and deliverables."
    },
    {
      title: "Project Research3",
      start: new Date(2025, 2, 10, 14, 0),
      end: new Date(2025, 2, 10, 15, 0),
      room: "Room A",
      description: "Discuss project scope and deliverables."
    },
    {
      title: "Project Research4",
      start: new Date(2025, 2, 10, 15, 0),
      end: new Date(2025, 2, 10, 16, 0),
      room: "Room A",
      description: "Discuss project scope and deliverables."
    },
    {
      title: "需求讨论会",
      start: new Date(2025, 2, 11, 10, 0),
      end: new Date(2025, 2, 11, 11, 0),
      room: "Room B",
      description: "Discuss project scope and deliverables."
    }
  ]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", start: new Date(), end: new Date(), room: "", description: "" });
  const [filterRoom, setFilterRoom] = useState("");

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
        startAccessor="start"
        endAccessor="end"
        //selectable
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
    </Box>
  );
};

export default Bookings;
