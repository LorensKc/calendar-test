import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import { ThemedView } from '@/components/ThemedView';
import { Calendar, CalendarUtils } from "react-native-calendars";
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

/* Functionality:
  ● Users can manage events on specific dates by clicking on the calendar.
  ● Available actions:

  ○ Create a new event – Enter an event name, set a time, and choose a repeat
  option.
  ○ Edit an existing event – Modify the name, repeat option, or time of an existing
  event.
  ○ Delete an event – Remove an event by clicking the delete button.
  ● Repeat options:
  ○ Weekly – The event recurs every week.
  ○ Bi-weekly – The event recurs every other week.
  ○ Monthly – The event recurs every month.
  ● Users must click the “Save” button to confirm event creation.
  ● Events should be stored locally so that past data is retained when the app is restarted.
  ● Dates with scheduled events should be highlighted accordingly.
*/
export default function HomeScreen() {

const INITIAL_DATE = Date.now();

  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);

  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
  }, []);

  const getDate = (count: number) => {
    const date = new Date(INITIAL_DATE);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };
  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "orange",
        selectedTextColor: "red",
      },
    };
  }, [selected]);
   const [eventName, setEventName] = useState("");
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());
   const [repeat, setRepeat] = useState("Every Week");
   const [showStartPicker, setShowStartPicker] = useState(false);
   const [showEndPicker, setShowEndPicker] = useState(false);

  const onSubmit = (data) => {
    // Simulate form submission
    console.log("Submitted Data:", startDate, endDate, repeat, eventName);
  };

  return (
    <ScrollView>
      <ThemedView style={styles.titleContainer}>
        <Calendar
          enableSwipeMonths
          current={INITIAL_DATE}
          onDayPress={onDayPress}
          markedDates={marked}
        />
      </ThemedView>
      <View style={styles.container}>
        <Text style={styles.label}>Event Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Event Name"
          value={eventName}
          onChangeText={setEventName}
        />

        <View style={styles.dateContainer}>
          <Text style={styles.label}>Starts</Text>
          <TouchableOpacity
            onPress={() => setShowStartPicker(true)}
            style={styles.dateInput}
          >
            <Text>{startDate.toLocaleString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowStartPicker(true)}
            style={styles.dateInput}
          >
            <Text>{startDate.toLocaleString()}</Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="datetime"
              display="default"
              onChange={(event, date) => {
                setShowStartPicker(false);
                if (date) setStartDate(date);
              }}
            />
          )}
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.label}>Ends</Text>
          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            style={styles.dateInput}
          >
            <Text>{endDate.toLocaleString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            style={styles.dateInput}
          >
            <Text>{endDate.toLocaleString()}</Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="datetime"
              display="default"
              onChange={(event, date) => {
                setShowEndPicker(false);
                if (date) setEndDate(date);
              }}
            />
          )}
        </View>

        <View>
          <Text style={styles.label}>Repeat</Text>
          <Picker
            selectedValue={repeat}
            onValueChange={(itemValue) => setRepeat(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Every Day" value="Every Day" />
            <Picker.Item label="Every Week" value="Every Week" />
            <Picker.Item label="Every Month" value="Every Month" />
            <Picker.Item label="Never" value="Never" />
          </Picker>

          <TouchableOpacity style={styles.saveButton} onPress={onSubmit}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  container: {
    padding: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    borderColor: "#ddd",
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  saveButton: {
    backgroundColor: "#FFCC00",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10
  },
});
