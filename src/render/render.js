import { clearCanvas } from './clear';
import { renderStars } from './stars';
import { renderPlayer } from './player';

export const render = (ctx, state) => {
  clearCanvas(ctx);
  renderStars(ctx, state);
  renderPlayer(ctx, state);
};
