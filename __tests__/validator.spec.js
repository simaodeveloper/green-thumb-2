import { validator } from '../src/libraries/validator.js';

test('should show a console log', () => {
  expect(validator()).toBe('is valid');
});
