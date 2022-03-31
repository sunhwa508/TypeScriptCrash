import { SummaryType, PickCountriesDetailType } from 'Covid';
import { fetchCountryInfo, fetchCovidSummary } from './api';
import {
  UpdateTimeStamp,
  TotalRecoveredList,
  TotalRecovered,
  TotalDeathsList,
  TotalDeaths,
  ConfirmCasesRank,
  TotalConfirmed,
} from './components';
import CountryChart from './components/Chart';
import { $ } from './utils/common';

// utils 타입
const confirmedTotal = $<HTMLSpanElement>('.confirmed-total');
const deathsTotal = $<HTMLParagraphElement>('.deaths');
const recoveredTotal = $<HTMLParagraphElement>('.recovered');
const lastUpdatedTime = $<HTMLParagraphElement>('.last-updated-time');
const rankList = $<HTMLOListElement>('.rank-list');
const deathsList = $<HTMLOListElement>('.deaths-list');
const recoveredList = $<HTMLOListElement>('.recovered-list');

const deathSpinner = createSpinnerElement('deaths-spinner');
const recoveredSpinner = createSpinnerElement('recovered-spinner');

function createSpinnerElement(id: string) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute('id', id);
  wrapperDiv.setAttribute(
    'class',
    'spinner-wrapper flex justify-center align-center',
  );
  const spinnerDiv = document.createElement('div');
  spinnerDiv.setAttribute('class', 'ripple-spinner');
  spinnerDiv.appendChild(document.createElement('div'));
  spinnerDiv.appendChild(document.createElement('div'));
  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}

// state
let isDeathLoading = false;

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

async function handleListClick(event: Event) {
  let selectedId = '';
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event?.target?.parentElement?.id || '';
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }
  if (isDeathLoading) {
    return;
  }
  if (selectedId === 'united-states')
    return alert('데이터가 많아 총괄 현황은 제공하지 않아요😭');

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

  TotalDeathsList(deathsList, deathResponse);
  TotalRecoveredList(recoveredList, recoveredResponse);
  setTotalDeathsByCountry(deathResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  CountryChart(getNewCanvas(), confirmedResponse);
  isDeathLoading = false;
}

function clearDeathList(): void {
  const list = deathsList;
  list.innerHTML = '';
}

function setTotalDeathsByCountry(data: PickCountriesDetailType[]) {
  deathsTotal.innerText = data[0].Cases;
}

function clearRecoveredList() {
  recoveredList.innerHTML = '';
}

function setTotalRecoveredByCountry(data: PickCountriesDetailType[]) {
  recoveredTotal.innerText = data[0].Cases;
}

function startLoadingAnimation() {
  deathsList.appendChild(deathSpinner);
  recoveredList.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
  deathsList.removeChild(deathSpinner);
  recoveredList.removeChild(recoveredSpinner);
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
