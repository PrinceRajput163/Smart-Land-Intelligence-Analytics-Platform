import {
  Brain,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

import { predictionData } from "../data/dummyData";

function AIPrediction() {

  return (

    <div className="bg-white rounded-xl shadow p-6 mt-10">

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">

        <Brain />

        AI Land Prediction

      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Development Score */}

        <div className="p-5 bg-green-100 rounded-xl">

          <TrendingUp
            size={35}
            className="text-green-700"
          />

          <h3 className="font-bold mt-3">
            Development Suitability
          </h3>

          <p className="text-3xl font-bold mt-2">

            {predictionData.result}

          </p>

        </div>

        {/* Risk */}

        <div className="p-5 bg-yellow-100 rounded-xl">

          <AlertTriangle
            size={35}
            className="text-yellow-700"
          />

          <h3 className="font-bold mt-3">

            Risk Level

          </h3>

          <p className="text-3xl font-bold mt-2">

            {predictionData.risk}

          </p>

        </div>

        {/* Confidence */}

        <div className="p-5 bg-blue-100 rounded-xl">

          <Brain
            size={35}
            className="text-blue-700"
          />

          <h3 className="font-bold mt-3">

            AI Confidence

          </h3>

          <p className="text-3xl font-bold mt-2">

            {predictionData.confidence}

          </p>

        </div>

      </div>

    </div>

  );

}

export default AIPrediction;