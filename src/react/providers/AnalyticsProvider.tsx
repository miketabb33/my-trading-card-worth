import posthog, { PostHogConfig } from 'posthog-js'
import { createContext, useContext, useEffect } from 'react'
import { ChildrenProp } from '../types/ChildrenProp'
import React from 'react'
import { ENV } from '../../server/env'
import { UseEffectType } from '../types/UseEffectType'
import { useProfile } from './ProfileProvider'

const POSTHOG_TOKEN = 'phc_K3RFH8hXukRn6HEGsqQnDD8IjTOU8VYhoDXUNlazE3P'
const POSTHOG_CONFIG: Partial<PostHogConfig> = {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'always',
}

export type AnalyticsContextType = {
  capture: () => void
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  capture: () => {},
})

export const useAnalyticsProvider = () => {
  const { profile } = useProfile()

  const initEffect: UseEffectType = {
    effect: () => {
      if (ENV.ID === 'production') {
        posthog.init(POSTHOG_TOKEN, POSTHOG_CONFIG)
      }
    },
    deps: [],
  }

  const identifyEffect: UseEffectType = {
    effect: () => {
      if (ENV.ID === 'production') {
        if (profile) posthog.identify(String(profile.id), { ...profile })
      }
    },
    deps: [profile],
  }

  // posthog.capture('my event', { property: 'value' })
  return {
    value: {
      capture: () => {},
    },
    initEffect,
    identifyEffect,
  }
}

export const AnalyticsContextProvider = ({ children }: ChildrenProp) => {
  const { value, initEffect, identifyEffect } = useAnalyticsProvider()

  useEffect(initEffect.effect, initEffect.deps)
  useEffect(identifyEffect.effect, identifyEffect.deps)

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
}

export const useAnalytics = (): AnalyticsContextType => {
  return useContext(AnalyticsContext)
}
