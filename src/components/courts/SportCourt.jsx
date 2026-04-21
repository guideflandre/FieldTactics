import { TennisCourt } from './TennisCourt.jsx';
import { PadelCourt } from './PadelCourt.jsx';
import { FootballPitch } from './FootballPitch.jsx';
import { FieldHockeyPitch } from './FieldHockeyPitch.jsx';
import { IceHockeyRink } from './IceHockeyRink.jsx';
import { BasketballCourt } from './BasketballCourt.jsx';
import { VolleyballCourt } from './VolleyballCourt.jsx';
import { BaseballField } from './BaseballField.jsx';

const COURT_MAP = {
  tennis: TennisCourt,
  padel: PadelCourt,
  football: FootballPitch,
  field_hockey: FieldHockeyPitch,
  ice_hockey: IceHockeyRink,
  basketball: BasketballCourt,
  volleyball: VolleyballCourt,
  baseball: BaseballField,
};

export function SportCourt({ sportId, theme, width, height }) {
  const Court = COURT_MAP[sportId] ?? TennisCourt;
  return <Court theme={theme} width={width} height={height} />;
}
