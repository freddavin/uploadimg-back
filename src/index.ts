import { getErrorInfo } from './libs/core';
import { connect } from './libs/db';
import { app } from './server';

const PORT = process.env.PORT || 3000;

connect().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    const { code, message } = getErrorInfo(error);
    console.log(`[Error] ${code} - ${message}`, { error });
  }
});
