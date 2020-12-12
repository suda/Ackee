import { createElement as h, Fragment, useMemo } from 'react'

import { SORTINGS_TOP } from '../../../../constants/sortings'
import { RANGES_LAST_24_HOURS } from '../../../../constants/ranges'
import { INTERVALS_DAILY } from '../../../../constants/intervals'
import { VIEWS_TYPE_UNIQUE } from '../../../../constants/views'
import { SYSTEMS_TYPE_WITH_VERSION } from '../../../../constants/systems'
import { DEVICES_TYPE_WITH_MODEL } from '../../../../constants/devices'
import { BROWSERS_TYPE_WITH_VERSION } from '../../../../constants/browsers'
import { SIZES_TYPE_BROWSER_RESOLUTION } from '../../../../constants/sizes'

import * as route from '../../constants/route'
import useCardWidgets from '../../hooks/useCardWidgets'

import viewsLoader from '../../loaders/viewsLoader'
import durationsLoader from '../../loaders/durationsLoader'
import pagesLoader from '../../loaders/pagesLoader'
import referrersLoader from '../../loaders/referrersLoader'
import systemsLoader from '../../loaders/systemsLoader'
import devicesLoader from '../../loaders/devicesLoader'
import browsersLoader from '../../loaders/browsersLoader'
import sizesLoader from '../../loaders/sizesLoader'
import languagesLoader from '../../loaders/languagesLoader'

// TODO: Refactor facts
// import enhanceFacts from '../../enhancers/enhanceFacts'
// import CardFacts from '../cards/CardFacts'

const RouteDomain = (props) => {

	const domainId = props.route.params.domainId

	const essentialWidgetConfigs = useMemo(() => [
		{
			loader: viewsLoader(domainId, {
				interval: INTERVALS_DAILY,
				type: VIEWS_TYPE_UNIQUE
			}),
			additionalProps: {
				wide: true,
				headline: 'Site Views',
				onMore: () => props.setRoute(route.ROUTE_VIEWS)
			}
		},
		{
			loader: durationsLoader(domainId, {
				interval: INTERVALS_DAILY
			}),
			additionalProps: {
				wide: true,
				headline: 'Durations',
				onMore: () => props.setRoute(route.ROUTE_DURATIONS)
			}
		},
		{
			loader: pagesLoader(domainId, {
				range: RANGES_LAST_24_HOURS,
				sorting: SORTINGS_TOP
			}),
			additionalProps: {
				headline: 'Pages',
				onMore: () => props.setRoute(route.ROUTE_PAGES)
			}
		},
		{
			loader: referrersLoader(domainId, {
				range: RANGES_LAST_24_HOURS,
				sorting: SORTINGS_TOP
			}),
			additionalProps: {
				headline: 'Referrers',
				onMore: () => props.setRoute(route.ROUTE_REFERRERS)
			}
		}
	], [])

	const detailedWidgetConfigs = useMemo(() => [
		{
			loader: systemsLoader(domainId, {
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS,
				type: SYSTEMS_TYPE_WITH_VERSION
			}),
			additionalProps: {
				headline: 'Systems',
				onMore: () => props.setRoute(route.ROUTE_SYSTEMS)
			}
		},
		{
			loader: devicesLoader(domainId, {
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS,
				type: DEVICES_TYPE_WITH_MODEL
			}),
			additionalProps: {
				headline: 'Devices',
				onMore: () => props.setRoute(route.ROUTE_DEVICES)
			}
		},
		{
			loader: browsersLoader(domainId, {
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS,
				type: BROWSERS_TYPE_WITH_VERSION
			}),
			additionalProps: {
				headline: 'Browsers',
				onMore: () => props.setRoute(route.ROUTE_BROWSERS)
			}
		},
		{
			loader: sizesLoader(domainId, {
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS,
				type: SIZES_TYPE_BROWSER_RESOLUTION
			}),
			additionalProps: {
				headline: 'Sizes',
				onMore: () => props.setRoute(route.ROUTE_SIZES)
			}
		},
		{
			loader: languagesLoader(domainId, {
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS
			}),
			additionalProps: {
				headline: 'Languages',
				onMore: () => props.setRoute(route.ROUTE_LANGUAGES)
			}
		}
	], [])

	const renderedEssentialWidgets = useCardWidgets(props, essentialWidgetConfigs)
	const renderedDetailedWidgets = useCardWidgets(props, detailedWidgetConfigs)

	return (
		h(Fragment, {},
			// h(CardFacts, {
			// 	items: enhanceFacts(selectOverviewValue.withoutType(props, domainId).facts)
			// }),
			h('div', { className: 'content__spacer' }),
			renderedEssentialWidgets,
			h('div', { className: 'content__spacer' }),
			renderedDetailedWidgets
		)
	)

}

export default RouteDomain