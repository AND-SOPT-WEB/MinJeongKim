// emotion.d.ts
import '@emotion/styled';
import { Themetype } from './styles/theme.ts';

declare module '@emotion/styled' {
  export interface Theme extends Themetype {}
}
