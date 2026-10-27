
import type { Executor, } from "./types";

interface RegisteredExecutor {
	executor: Executor;
	sourceId: string;
}

const executors = new Map<string, RegisteredExecutor>();

/** Register or replace an executor. `sourceId` scopes later unregistration. */
export function registerExecutor(name: string, executor: Executor, sourceId: string): void {
	executors.set(name, { executor, sourceId });
}

/** Remove the executor registered under `name` by `sourceId`. No-op otherwise. */
export function unregisterExecutor(name: string, sourceId: string): void {
	const existing = executors.get(name);
	if (existing && existing.sourceId === sourceId) {
		executors.delete(name);
	}
}

/** Whether `name` has a registered executor. */
export function hasExecutor(name: string): boolean {
	return executors.has(name);
}

/** Names of all registered executors, sorted (for error messages). */
export function listExecutors(): string[] {
	return [...executors.keys()].sort();
}

/** Resolve the executor registered under `name`, or undefined when absent. */
export function resolveExecutor(name: string): Executor | undefined {
	return executors.get(name)?.executor;
}
