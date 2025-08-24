export const calculateHomestayRating = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return {
      avgPrice: 0,
      avgLocation: 0,
      avgCommunication: 0,
      avgExactly: 0,
      avgCleanliness: 0,
      averageRateTotal: 0,
      rateTitle: "Chưa có đánh giá",
    };
  }

  const total = reviews.reduce(
    (acc, cur) => {
      acc.price += cur.price;
      acc.location += cur.location;
      acc.communication += cur.communication;
      acc.exactly += cur.exactly;
      acc.cleanlinessLevel += cur.cleanlinessLevel;
      return acc;
    },
    { price: 0, location: 0, communication: 0, exactly: 0, cleanlinessLevel: 0 }
  );

  const count = reviews.length;

  const avgPrice = total.price / count;
  const avgLocation = total.location / count;
  const avgCommunication = total.communication / count;
  const avgExactly = total.exactly / count;
  const avgCleanliness = total.cleanlinessLevel / count;

  const averageRateTotal =
    (avgPrice + avgLocation + avgCommunication + avgExactly + avgCleanliness) /
    5;

  const rateTitle = averageRateTotal > 4.5 ? "Tuyệt vời" : "Không có";

  return {
    avgPrice: Number(avgPrice.toFixed(1)),
    avgLocation: Number(avgLocation.toFixed(1)),
    avgCommunication: Number(avgCommunication.toFixed(1)),
    avgExactly: Number(avgExactly.toFixed(1)),
    avgCleanliness: Number(avgCleanliness.toFixed(1)),
    averageRateTotal: Number(averageRateTotal.toFixed(1)),
    rateTitle,
  };
};
