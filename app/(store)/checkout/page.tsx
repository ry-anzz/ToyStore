"use client";

import { useState } from "react";
import { AddressStep } from "@/components/checkout/AddressStep";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PaymentStep } from "@/components/checkout/PaymentStep";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<'address' | 'payment'>('address');
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  const handleContinueToPayment = (addressId: number) => {
    setSelectedAddressId(addressId);
    setCurrentStep('payment');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Finalizar Compra</h1>
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          {currentStep === 'address' && <AddressStep onContinue={handleContinueToPayment} />}
          {currentStep === 'payment' && <PaymentStep onBack={() => setCurrentStep('address')} selectedAddressId={selectedAddressId!} />}
        </div>
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}