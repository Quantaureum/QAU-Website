"use client"

import React, { useEffect, useMemo, useState } from "react"
import isChromatic from "chromatic"

import type { PhoneScreenProps } from "@/lib/types"

import { useGasQauPrice } from "../../../../hooks/useGasQauPrice"
import {
  ETH_TRANSFER_GAS_UNITS,
  FALLBACK_ETH_PRICE,
  FALLBACK_GAS_PRICE_GWEI,
  USD_RECEIVE_AMOUNT,
} from "../../constants"
import { defaultTokenBalances } from "../../constants"
import { ProgressCta } from "../../ProgressCta"
import { WalletHome } from "../../WalletHome"
import type { TokenBalance } from "../../WalletHome/interfaces"

import { CONTACTS } from "./constants"
import { ReceivedEther } from "./ReceivedQau"
import { ReceiveEther } from "./ReceiveQau"
import { SendEther } from "./SendQau"
import { SendFromContacts } from "./SendFromContacts"
import { SendSummary } from "./SendSummary"
import { Success } from "./Success"

export const SendReceive = ({ nav, ctaLabel }: PhoneScreenProps) => {
  const { progressStepper, step } = nav
  const { qauPrice: fetchedPrice, gasPrice: fetchedGasPrice } = useGasQauPrice()
  const qauPrice =
    fetchedPrice > 1 && !isChromatic() ? fetchedPrice : FALLBACK_ETH_PRICE
  const gasPriceGwei =
    fetchedGasPrice > 0 && !isChromatic()
      ? fetchedGasPrice
      : FALLBACK_GAS_PRICE_GWEI
  const qauTransferFee = ETH_TRANSFER_GAS_UNITS * gasPriceGwei * 1e-9
  const qauReceiveAmount = USD_RECEIVE_AMOUNT / qauPrice
  const [chosenAmount, setChosenAmount] = useState(0)
  const qauChosenAmount = chosenAmount / qauPrice
  const [recipient, setRecipient] = useState<string | null>(null)
  const qauAfterTransfer = Math.max(
    qauReceiveAmount - chosenAmount / qauPrice - qauTransferFee,
    0
  )

  useEffect(() => {
    if (step !== 2) return
    // Reset chosen amount if user goes back to step 2
    setChosenAmount(0)
  }, [step])

  useEffect(() => {
    if (step !== 4) return
    // Reset chosen amount if user goes back to step 2
    setRecipient(null)
  }, [step])

  const tokenBalancesAfterSend = useMemo<Array<TokenBalance>>(
    () =>
      defaultTokenBalances.map((token) =>
        token.ticker === "QAU"
          ? {
              ...token,
              amount: qauAfterTransfer,
              usdConversion: qauPrice,
            }
          : token
      ),
    [qauPrice, qauAfterTransfer]
  )

  return (
    <>
      {[0].includes(step) && <WalletHome nav={nav} isEnabled={[false, true]} />}
      {[1].includes(step) && <ReceiveEther />}
      {[2].includes(step) && (
        <ReceivedEther
          nav={nav}
          qauPrice={qauPrice}
          defaultTokenBalances={defaultTokenBalances}
          qauReceiveAmount={qauReceiveAmount}
          sender={CONTACTS[0].name}
        />
      )}
      {[3].includes(step) && (
        <SendEther
          chosenAmount={chosenAmount}
          qauPrice={qauPrice}
          qauBalance={qauReceiveAmount}
          setChosenAmount={setChosenAmount}
        />
      )}
      {[4].includes(step) && (
        <SendFromContacts nav={nav} setRecipient={setRecipient} />
      )}
      {[5].includes(step) && (
        <SendSummary
          chosenAmount={chosenAmount}
          qauPrice={qauPrice}
          qauTransferFee={qauTransferFee}
          recipient={recipient!}
          qauAvailable={qauReceiveAmount}
        />
      )}
      {[6].includes(step) && (
        <Success
          tokenBalances={tokenBalancesAfterSend}
          qauPrice={qauPrice}
          sentQauAmount={qauChosenAmount}
          recipient={recipient!}
        />
      )}
      {[1, 3, 5].includes(step) && (
        <ProgressCta
          isAnimated={step === 0}
          disabled={step === 3 && !chosenAmount}
          progressStepper={progressStepper}
        >
          {ctaLabel}
        </ProgressCta>
      )}
    </>
  )
}
