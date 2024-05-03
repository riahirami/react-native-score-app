import type {NavigationContainerRef, Route} from '@react-navigation/native';

import * as React from 'react';

import {StackActions} from '@react-navigation/native';

/**
 * Create a ref to navigation container.
 * This is used to execute navigation actions outside of Navigation Hierarchy.
 */
export const navigationRef = React.createRef<NavigationContainerRef<any>>();

/**
 * Navigate to the specified route with the possibility to add custom params
 * @param name - Screen name to navigate to (Use screenNames util file)
 * @param params - Pass additional params as JSON object to use later in screen (route.params.param_key)
 */
export function navigate(name: string, params: any): void {
  navigationRef.current?.navigate(name, params);
}

/**
 * Adds a route on top of the stack and navigates forward to it
 * @param name - Screen name to navigate to (Use screenNames util file)
 * @param params - Pass additional params as JSON object to use later in screen (route.params.param_key)
 */
export function push(name: string, params?: object | undefined): void {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

/**
 * Allows to replace the current route in the navigation state
 * @param name - Screen name to navigate to (Use screenNames util file)
 * @param params - Pass additional params as JSON object to use later in screen (route.params.param_key)
 */
export function replace(name: string, params?: object | undefined): void {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

/**
 * Navigate back to a previous screen in the stack.
 */
export function pop(): void {
  navigationRef.current?.dispatch(StackActions.pop());
}

/**
 * Takes you back to the first screen in the stack and dismissing all the others
 */
export function popToTop(): void {
  navigationRef.current?.dispatch(StackActions.popToTop());
}

/**
 * Reset the navigation state to the given state (Array of routes and index)
 * @param index - Index of the currently focused route.
 * @param routes - List of rendered routes.
 */
export function resetStack(index: number, routes: any): void {
  navigationRef.current?.reset({
    index: index,
    routes: routes,
  });
}

/**
 * Returns current route (Including name and params)
 * @returns {Route} - Returns current focused route
 */
export function getCurrentRoute(): Route<string> | undefined {
  return navigationRef.current?.getCurrentRoute();
}
