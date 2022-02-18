import { Args, Query, Resolver } from '@nestjs/graphql'
import { PayStatesFilter } from './inputs/payStatesFilter.input'
import { ReportService } from './report.service'
import { DailyReport } from './results/daily.result'
import { GeneralPayStateReport } from './results/generalPayStateReport.result'

@Resolver()
export class ReportResolver {

    constructor(
        private readonly reportService: ReportService
    ) {}

    @Query( () => DailyReport)
    async getDailyResume(@Args('date') date: string) {

        return await this.reportService.getDailyResume(date)
    
    }

    @Query( () => GeneralPayStateReport)
    async getDailyPayState(@Args('date') date: string) {

        return await this.reportService.getDailyPayState(date)
    
    }

    @Query( () => GeneralPayStateReport)
    async getEquipmentPayState(@Args('filters') filters: PayStatesFilter) {

        return await this.reportService.getEquipmentPayState(filters)
    
    }

}
