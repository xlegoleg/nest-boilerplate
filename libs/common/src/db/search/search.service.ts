import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { estypes } from '@elastic/elasticsearch';

@Injectable()
export class SearchService {
  public constructor(private elasticsearchService: ElasticsearchService) {}

  public search(params: estypes.SearchRequest) {
    return this.elasticsearchService.search(params);
  }
}
