import React from "react";
import QRCode from "react-qr-code";

const Scanner = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      
      <h2 className="text-xl font-semibold mb-4">Scan to View My Europass Profile</h2>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value="https://europa.eu/europass/eportfolio/api/eprofile/shared-profile/siva+kumar-aketi/fab13cca-9f88-42d9-9590-0c70212e0c7f?view=html"
        viewBox={`0 0 256 256`}
      />
    </div>
  );
};

export default Scanner;
