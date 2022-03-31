import { SummaryType, PickCountriesDetailType } from 'Covid';
import { fetchCountryInfo, fetchCovidSummary } from './api';
import { $ } from './utils/common';
import {
  UpdateTimeStamp,
  TotalRecoveredList,
  TotalRecovered,
  TotalDeathsList,
  TotalDeaths,
  ConfirmCasesRank,
  TotalConfirmed,
  Spinner,
  CountryChart,
} from './components';

// utils 타입
const confirmedTotal = $<HTMLSpanElement>('.confirmed-total');
const deathsTotal = $<HTMLParagraphElement>('.deaths');
const recoveredTotal = $<HTMLParagraphElement>('.recovered');
const lastUpdatedTime = $<HTMLParagraphElement>('.last-updated-time');
const rankList = $<HTMLOListElement>('.rank-list');
const deathsList = $<HTMLOListElement>('.deaths-list');
const recoveredList = $<HTMLOListElement>('.recovered-list');

// methods
function startApp() {
  setupData();
  initEvents();
}

// events
function initEvents() {
  rankList.addEventListener('click', handleListClick);
}

function getNewCanvas() {
  const $chartContainer = $('.chart-container');
  $chartContainer.innerHTML = /*html*/ `
    <canvas id="lineChart"
            class="corona-chart"
            style="width: 100%; height: 356px; background-color: #5b5656;"
    ></canvas>`;
  const $chartCanvas = $<HTMLCanvasElement>('#lineChart');
  return $chartCanvas;
}

function getSelectedId(event: Event) {
  const target = event.target as HTMLElement;
  const selectedId = target?.id || target?.parentElement?.id || '';

  if (selectedId === 'united-states')
    return alert('데이터가 많아 총괄 현황은 제공하지 않아요😭');

  return selectedId;
}

async function handleListClick(event: Event) {
  let isDeathLoading = false;
  const selectedId = getSelectedId(event);
  if (!selectedId) return;
  if (isDeathLoading) {
    return;
  }

  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();

  isDeathLoading = true;
  const deathResponse = await fetchCountryInfo<PickCountriesDetailType[]>(
    selectedId,
    'deaths',
  );
  const recoveredResponse = await fetchCountryInfo<PickCountriesDetailType[]>(
    selectedId,
    'recovered',
  );
  const confirmedResponse = await fetchCountryInfo<PickCountriesDetailType[]>(
    selectedId,
    'confirmed',
  );
  endLoadingAnimation();

  TotalDeathsList(deathsTotal, deathsList, deathResponse);
  TotalRecoveredList(recoveredTotal, recoveredList, recoveredResponse);
  CountryChart(getNewCanvas(), confirmedResponse);
  isDeathLoading = false;
}

function clearDeathList(): void {
  const list = deathsList;
  list.innerHTML = '';
}

function clearRecoveredList() {
  recoveredList.innerHTML = '';
}

function startLoadingAnimation() {
  Spinner(deathsList, 'deaths-spinner', true);
  Spinner(recoveredList, 'recovered-spinner', true);
}

function endLoadingAnimation() {
  Spinner(deathsList, 'deaths-spinner', false);
  Spinner(recoveredList, 'recovered-spinner', false);
}

async function setupData() {
  const data = await fetchCovidSummary<SummaryType>();
  TotalDeaths(deathsTotal, data);
  TotalRecovered(recoveredTotal, data);
  ConfirmCasesRank(rankList, data);
  TotalConfirmed(confirmedTotal, data);
  UpdateTimeStamp(lastUpdatedTime, data);
}

startApp();
