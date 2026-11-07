import { HtmlBodyTag } from './models';

/**
 * Types of changes that can occur to a body tag.
 */
export enum ChangeType {
  /** One or more fields within the tag were modified */
  Updated = 'updated',
  /** Tag was added to the array */
  Added = 'added',
  /** Tag was removed from the array */
  Removed = 'removed',
  /** Tag was moved (reordered) within the array */
  Moved = 'moved',
  /** Multiple changes batched together */
  Batch = 'batch'
}

/**
 * Describes a change at the field level within an HtmlBodyTag.
 */
export interface TagFieldChange {
  fieldName: string;
  oldValue: unknown;
  newValue: unknown;
}

/**
 * Granular diff between two HtmlBodyTag instances.
 */
export interface TagDiff {
  /** The trackingId of the changed tag */
  trackingId: string;
  /** Index where the tag was located */
  index: number;
  /** What kind of operation occurred */
  changeType: ChangeType;
  /** Which fields changed and their values */
  fieldChanges: TagFieldChange[];
  /** Full old tag (before change) */
  oldTag?: HtmlBodyTag;
  /** Full new tag (after change) */
  newTag?: HtmlBodyTag;
  /** Full HTML snapshot after the change */
  htmlSnapshot?: string;
  /** Timestamp of the change */
  timestamp: number;
}

/**
 * Snapshot of the complete bodyTags array at a point in time.
 * Used for undo/redo and diff computation.
 */
export interface ChangeSnapshot {
  /** Sequential snapshot ID */
  id: string;
  /** The bodyTags array at this point */
  bodyTags: HtmlBodyTag[];
  /** The HTML string at this point */
  html: string;
  /** When this snapshot was taken (ms since epoch) */
  timestamp: number;
  /** Optional user/operation label */
  label?: string;
}

/**
 * A batched set of changes to be applied together.
 */
export interface ChangeBatch {
  changes: TagDiff[];
  batchId: string;
  timestamp: number;
}

/**
 * Options for the optimized change tracker.
 */
export interface ChangeTrackerOptions {
  /** Maximum number of snapshots to keep in history */
  maxHistorySize?: number;
  /** Emit changes as they happen (true) or batch them (false) */
  emitImmediately?: boolean;
  /** Batching window in ms when emitImmediately is false */
  batchWindowMs?: number;
}

/**
 * Default snapshot limit to prevent unbounded memory growth.
 */
export const DEFAULT_MAX_HISTORY_SIZE = 100;

/**
 * Default batching window in milliseconds.
 */
export const DEFAULT_BATCH_WINDOW_MS = 250;
