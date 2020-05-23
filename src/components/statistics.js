// Компоненты
import SmartComponent from "./smart-component.js";

// Константы
const BAR_HEIGHT = 55;
const IMAGE_SIZE = 20;
const IMAGE_PADDING = IMAGE_SIZE;

// Библиотеки
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

// Получение уникальных значений
const getUniqItems = (item, index, array) => {
  return array.indexOf(item) === index;
};

// Получение типов точек маршрута
const getTypes = (events) => {
  return events.map((eventsItem) => eventsItem.type.toUpperCase()).filter(getUniqItems);
};

// Подсчёт затраченных средств
const calculateMoney = (events, type) => {
  let moneySum = 0;
  const money = events.reduce((acc, eventsItem) => {
    if (eventsItem.type.toUpperCase() === type) {
      moneySum += eventsItem.price;
      acc[eventsItem.type.toUpperCase()] = moneySum;
    }
    return acc;
  }, {});
  return money[type];
};

// Подсчёт транаспортных средств
const calculateTransport = (events, type) => {
  return events.filter((eventsItem) => eventsItem.type.toUpperCase() === type).length;
};

// Подсчёт затраченного времени
const calculateTimeSpent = (events, type) => {
  let timeSpentSum = 0;
  const timeSpent = events.reduce((acc, eventsItem) => {
    if (eventsItem.type.toUpperCase() === type) {
      timeSpentSum += moment(eventsItem.end).diff(moment(eventsItem.start), `hours`, true);
      acc[eventsItem.type.toUpperCase()] = Math.round(timeSpentSum);
    }
    return acc;
  }, {});
  return timeSpent[type];
};

// Анимация диаграммы
const chartCallback = (animation) => {
  const chart = animation.chart;
  const axisY = chart.scales[`y-axis-0`];
  const ticks = axisY.ticks;
  const fontSize = axisY.options.ticks.fontSize;

  if (axisY.getPixelForTick(ticks.length - 1)) {
    ticks.forEach((tick, idx) => {

      const onLoadImage = (evt) => {
        const textParams = chart.ctx.font;
        chart.ctx.textAlign = `center`;
        chart.ctx.textBaseline = `milldle`;
        chart.ctx.font = `normal ${fontSize}px sans-serif`;
        const tickWidth = chart.ctx.measureText(tick).width;
        chart.ctx.font = textParams;

        const tickY = axisY.getPixelForTick(idx) - fontSize;
        const tickX = axisY.right - tickWidth - IMAGE_SIZE - IMAGE_PADDING;

        chart.ctx.drawImage(evt.target, tickX, tickY, IMAGE_SIZE, IMAGE_SIZE);
        evt.target.removeEventListener(`load`, onLoadImage);
      };

      const tickIcon = new Image();
      tickIcon.addEventListener(`load`, onLoadImage);
      tickIcon.src = `img/icons/${tick}.png`;
    });
  }
};

// Отрисовка диаграммы
const renderChart = (ctx, types, calculation, title, measure) => {
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: types,
      datasets: [{
        data: calculation,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        minBarLength: 50,
        barThickness: 44
      }]
    },
    options: {
      events: [`click`],
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}${measure}`
        }
      },
      title: {
        display: true,
        text: title,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      },
      animation: {
        onProgress: chartCallback
      }
    }
  });
};

// Отрисовка диаграммы затраченных средств
const renderMoneyChart = (moneyCtx, events) => {
  const types = getTypes(events);
  const money = types.map((type) => calculateMoney(events, type));
  const title = `MONEY`;
  const measure = ` €`;

  renderChart(moneyCtx, types, money, title, measure);
};

// Отрисовка диаграммы транспортных средств
const renderTransportChart = (transportCtx, events) => {
  const types = getTypes(events)
    .filter((eventsItem) => eventsItem !== `RESTAURANT` && eventsItem !== `CHECK-IN` && eventsItem !== `SIGHTSEEING`);
  const transport = types.map((type) => calculateTransport(events, type));
  const title = `TRANSPORT`;
  const measure = `x`;

  renderChart(transportCtx, types, transport, title, measure);
};

// Отрисовка диаграммы затраченного времени
const renderTimeSpentChart = (timeSpentCtx, events) => {
  const types = getTypes(events);
  const timeSpent = types.map((type) => calculateTimeSpent(events, type));
  const title = `TIME SPENT`;
  const measure = `H`;

  renderChart(timeSpentCtx, types, timeSpent, title, measure);
};

// Шаблон секции статистики
const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>
      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>
      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>
      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

// Класс
export default class Statistics extends SmartComponent {
  constructor(eventsModel) {
    super();

    this._eventsModel = eventsModel;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpentChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();

    this.rerender();
  }

  recoveryListeners() {

  }

  rerender() {
    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();
    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpentCtx = element.querySelector(`.statistics__chart--time`);

    moneyCtx.height = BAR_HEIGHT * 7;
    transportCtx.height = BAR_HEIGHT * 5;
    timeSpentCtx.height = BAR_HEIGHT * 7;

    this._resetCharts();
    this._moneyChart = renderMoneyChart(moneyCtx, this._eventsModel.getAllEvents());
    this._transportChart = renderTransportChart(transportCtx, this._eventsModel.getAllEvents());
    this._timeSpentChart = renderTimeSpentChart(timeSpentCtx, this._eventsModel.getAllEvents());
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpentChart) {
      this._timeSpentChart.destroy();
      this._timeSpentChart = null;
    }
  }
}
