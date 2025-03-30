import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
// import { useSearchParams } from 'react-router-dom';

// Define the filter form schema
const formSchema = z.object({
    vehicleId: z.string().optional(),
    eventType: z.string().optional(),
    isActive: z.boolean().optional(),
});

interface IFilterValue {
    vehicleId: string;
    eventType: string;
    isActive: boolean | string;
}

const EventFilterForm = ({ onQueryHandler }: { onQueryHandler: (queryString: string) => void }) => {
    // const [searchParams, setSearchParams] = useSearchParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vehicleId: '',
            eventType: '',
            isActive: undefined,
        },
    });

    // Handle form submission
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        handleDebouceInput(values as IFilterValue);
    };

    // Reset all filters
    const handleReset = () => {
        form.reset();
        onQueryHandler('');
    };
    let timer: NodeJS.Timeout | undefined;
    function handleDebouceInput(values: IFilterValue) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            // console.log('after delay', values);
            const filteredParams = Object.fromEntries(Object.entries(values).filter((item) => !!item[1]));
            const queryString = new URLSearchParams(filteredParams as unknown as Record<string, string>).toString();
            console.log(queryString);
            onQueryHandler(queryString);
        }, 500);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                // className="space-y-4"
            >
                <div className="grid grid-cols-4 gap-4">
                    <FormField
                        control={form.control}
                        name="vehicleId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Enter vehicle ID"
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            form.handleSubmit(onSubmit)();
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="eventType"
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        form.handleSubmit(onSubmit)();
                                    }}
                                    value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select event type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Ignition On">Ignition On</SelectItem>
                                        <SelectItem value="Ignition Off">Ignition Off</SelectItem>
                                        <SelectItem value="Time Interval">Time Interval</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                            <FormItem className="flex flex-col justify-center h-full">
                                <div className="flex items-center space-x-2">
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                field.onChange(checked);
                                                form.handleSubmit(onSubmit)();
                                            }}
                                        />
                                    </FormControl>
                                    <FormLabel>Active Only</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    <div className="flex items-end">
                        <Button type="button" variant="outline" onClick={handleReset} className="w-full">
                            Reset Filters
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default EventFilterForm;
