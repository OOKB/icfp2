import React from 'react'
import PropTypes from 'prop-types'

const sessionColors = {
  returnsInvestmentFamilyPlanningDemographicDividend: '#42434c',
  policyFinancingAccountability: '#303628',
  demandGenerationSocialBehaviorChange: '#148663',
  fertilityIntentionFamilyPlanning: '#afddcd',
  reproductiveRightsGenderEmpowerment: '#bac5cf',
  improvingQualityCare: '#496a85',
  expandingAccessFamilyPlanning: '#4151a3',
  advancesContraceptiveTechnologyCommoditySecurity: '#3d2354',
  integrationFamilyPlanningHealthDevelopmentPrograms: '#7c51a1',
  sexualReproductiveHealthRightsAmongAdolescentsYouth: '#ac7892',
  menFamilyPlanning: '#7d0021',
  familyPlanningReproductiveHealthHumanitarianSettings: '#eb6d24',
  faithFamilyPlanning: '#fad57c',
  urbanizationReproductiveHealth: '#decdba',
  advancesMonitoringEvaluationMethods: '#c8d29c',
}

function TrackColorDot({ trackId }) {
  const color = sessionColors[trackId]
  if (!color) return null
  return <div className="whatTrack" style={{ backgroundColor: color }}>trackId</div>
}
TrackColorDot.propTypes = {
  trackId: PropTypes.string.isRequired,
}
export default TrackColorDot
