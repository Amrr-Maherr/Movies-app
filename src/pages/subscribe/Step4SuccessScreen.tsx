"use client";

import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Play, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Step4SuccessScreenProps {
  planName: string;
  onGoHome: () => void;
}

const Step4SuccessScreen = memo(function Step4SuccessScreen({
  planName,
  onGoHome,
}: Step4SuccessScreenProps) {
  const navigate = useNavigate();

  const handleStartWatching = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleGoHome = useCallback(() => {
    onGoHome();
  }, [onGoHome]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="border-neutral-800 bg-neutral-900/50 text-center">
          <CardContent className="pt-12 pb-8 px-8">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-2"
            >
              Subscription Confirmed!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-neutral-400 mb-6"
            >
              You&apos;re all set with the <span className="text-red-500 font-semibold">{planName}</span> plan
            </motion.p>

            {/* What's Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-neutral-800/50 rounded-lg p-4 mb-8"
            >
              <h3 className="text-sm font-medium text-white mb-3">What&apos;s next?</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Unlimited access to all movies and TV shows</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Download content for offline viewing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Watch on any device, anywhere</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Cancel anytime, no commitments</span>
                </li>
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <Button
                onClick={handleStartWatching}
                className="w-full h-14 text-base font-semibold bg-red-600 hover:bg-red-700"
                size="lg"
              >
                <Play className="mr-2 h-5 w-5 fill-current" />
                Start Watching Now
              </Button>
              <Button
                onClick={handleGoHome}
                variant="outline"
                className="w-full h-12 text-base border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                size="lg"
              >
                <Home className="mr-2 h-5 w-5" />
                Go to Home
              </Button>
            </motion.div>

            {/* Additional Info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-neutral-500 mt-6"
            >
              A confirmation email has been sent to your registered email address.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
});

export default Step4SuccessScreen;
