import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";

export default {
  plugins: [process.env.RSDOCTOR && new RsdoctorRspackPlugin({})].filter(
    Boolean
  ),
};
