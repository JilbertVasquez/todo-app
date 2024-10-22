import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { PriorityDto } from "../_dtos/priority-dto";
import { PriorityService } from "../_services/priority.service";

export const loadPriorityResolver: ResolveFn<PriorityDto[]> = async () => {
    const priorityService = inject(PriorityService);

    if (priorityService.priority().length) return priorityService.priority();

    await priorityService.loadPriorities();
    return priorityService.priority();
}