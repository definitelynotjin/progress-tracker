import React, { useMemo } from "react";
import { Navigate, DateLocalizer, NavigateAction } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";

interface CustomWeekViewProps {
  date: Date;
  localizer: DateLocalizer;
  max?: Date;
  min?: Date;
  scrollToTime?: Date;
}

const CustomWeekView: React.FC<CustomWeekViewProps> & {
  range?: (date: Date, { localizer }: { localizer: DateLocalizer }) => Date[];
  navigate?: (
    date: Date,
    action: NavigateAction,
    props: { localizer: DateLocalizer },
  ) => Date;
  title?: (date: Date, props: { localizer: DateLocalizer }) => string;
} = ({ date, localizer, max, min, scrollToTime, ...props }) => {
  const currRange = useMemo(
    () => CustomWeekView.range!(date, { localizer }),
    [date, localizer],
  );

  return (
    <TimeGrid
      eventOffset={15}
      localizer={localizer}
      max={max || localizer.endOf(new Date(), "day")}
      min={min || localizer.startOf(new Date(), "day")}
      range={currRange}
      scrollToTime={scrollToTime || localizer.startOf(new Date(), "day")}
      {...props}
    />
  );
};

CustomWeekView.range = (
  date: Date,
  { localizer }: { localizer: DateLocalizer },
) => {
  const start = date;
  const end = localizer.add(start, 2, "day");
  let current = start;
  const range = [];
  while (localizer.lte(current, end, "day")) {
    range.push(current);
    current = localizer.add(current, 1, "day");
  }
  return range;
};

CustomWeekView.navigate = (
  date: Date,
  action: NavigateAction,
  { localizer }: { localizer: DateLocalizer },
) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, "day");
    case Navigate.NEXT:
      return localizer.add(date, 3, "day");
    default:
      return date;
  }
};

CustomWeekView.title = (
  date: Date,
  { localizer }: { localizer: DateLocalizer },
) => {
  const [start, ...rest] = CustomWeekView.range!(date, { localizer });
  const end = rest.pop() || start;
  return localizer.format({ start, end }, "dayRangeHeaderFormat");
};

export default CustomWeekView;
