import { Pipe, PipeTransform } from '@angular/core';

export type PipeMapper<T, G, A> = (item: T, ...args: A[]) => G;

@Pipe({ name: 'pipeMapper', standalone: true })
export class PipeMapperPipe implements PipeTransform {
  /**
   * Maps object to an arbitrary result through a mapper function
   *
   * @param value an item to transform
   * @param mapper a mapping function
   * @param args arbitrary number of additional arguments
   */
  transform<T, G, A>(value: T, mapper: PipeMapper<T, G, A>, ...args: A[]): G {
    return mapper(value, ...args);
  }
}
