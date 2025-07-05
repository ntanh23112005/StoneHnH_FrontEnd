const formatDateTime = (date, time) => {
    return date && time
        ? `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(2, "0")} ${time.format("HH:mm")}:00`
        : "";
};

export { formatDateTime };