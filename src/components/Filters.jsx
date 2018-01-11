import React from 'react'

// Material UI
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel'
import { FormControl, FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'

const Filters = props => {
  const { className, toggleZoning, toggleTransit, toggleSchools, toggleFire } = props
  const { zoning, transit, schools, fireHydrants } = props.filters
  return (
    <div className={className ? className : "mt-auto mb-3"}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          Filters
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FormControl>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={zoning} onChange={toggleZoning} />}
                label="Zoning"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={transit} onChange={toggleTransit} />
                }
                label="Transit"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={schools} onChange={toggleSchools} />
                }
                label="Schools"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={fireHydrants} onChange={toggleFire} />
                }
                label="Fire Hydrants"
              />
            </FormGroup>
          </FormControl>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default Filters
